import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { GamePointsParams } from 'app/@shared/interface/game-points-params';
import {
  HiloParams,
  SixQuiPrendParams,
} from 'app/@shared/params/game-points-parms';
import { GamePointsService } from 'app/@shared/services/game-points.service';
import { LocalStorageService } from 'app/@shared/services/local-storage.service';
import { PlayersService } from 'app/@shared/services/players.service';
import { RoundScoresGameHelper } from 'app/new-scores/components/round-scores-game/round-scores-game.helper';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-round-scores-game',
  standalone: true,
  imports: [
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    InputNumberModule,
    Button,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './round-scores-game.component.html',
  styleUrl: './round-scores-game.component.css',
})
export class RoundScoresGameComponent implements OnInit {
  @Input() gameName: 'SixQuiPrend' | 'Hilo' = 'SixQuiPrend';
  gamePointsParams: GamePointsParams = SixQuiPrendParams;
  formHelper!: RoundScoresGameHelper;
  playerList: string[] = [];

  constructor(
    private playersService: PlayersService,
    private gamePointsService: GamePointsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.formHelper = new RoundScoresGameHelper(SixQuiPrendParams);
    this.playerList = await this.playersService.getPlayerList();
    if (this.gameName === 'Hilo') {
      this.gamePointsParams = HiloParams;
    }
    this.formHelper.fillForm(this.localStorageService.getGamePoints());
  }

  get isFormDisabled(): boolean {
    return this.form.invalid;
  }

  get players(): FormArray {
    return this.form.get(this.formHelper.PLAYERS_KEY) as FormArray;
  }

  get form(): FormGroup {
    return this.formHelper.getForm();
  }

  get disablePlayerAdding(): boolean {
    return (
      this.players.controls.length === this.gamePointsParams.maximumPlayers
    );
  }

  get disablePlayerRemoving(): boolean {
    return (
      this.players.controls.length === this.gamePointsParams.minimumPlayers
    );
  }

  updatePlayerTotal(index: number): void {
    const points = this.players
      .at(index)
      .get(this.formHelper.PLAYERS_POINTS_KEY) as FormArray;
    let total = 0;
    points.controls.forEach((val) => {
      total += val.value;
    });
    this.players.at(index).get('total')?.setValue(total);
    this.localStorageService.setGamePoints(
      this.formHelper.formatForLocalSave(),
    );
  }

  get numberOfRounds(): number {
    return this.formHelper.numberOfRounds;
  }

  getPoints(playerIndex: number) {
    return (
      this.players
        .at(playerIndex)
        .get(this.formHelper.PLAYERS_POINTS_KEY) as FormArray
    ).controls as FormControl[];
  }

  addPlayer(): void {
    this.formHelper.addPlayer();
  }

  removePlayer(): void {
    this.formHelper.removePlayer();
  }

  addRound(): void {
    this.formHelper.addRound();
  }

  async submit(event: Event): Promise<void> {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Confirmer',
      message: 'Voulez-vous enregistrer les scores ?',
      icon: 'none',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Enregistrer',
      rejectLabel: 'Annuler',
      rejectButtonStyleClass: 'p-button-text',
      accept: async (): Promise<void> => await this.confirmSubmit(),
      reject: (): void => {
        this.confirmationService.close();
      },
    });
  }

  private async confirmSubmit(): Promise<void> {
    await this.gamePointsService
      .saveGame(this.formHelper.formatForAPI(), this.gameName)
      .then((): void => {
        this.showMessage();
        this.localStorageService.emptyGamePoints();
        this.form.reset();
      })
      .catch((): void => {
        this.showError();
      });
  }

  private async showMessage(): Promise<void> {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Résultats enregistrés',
      key: 'br',
      life: 3000,
    });
  }

  private async showError(): Promise<void> {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Un problème est survenu',
      key: 'br',
      life: 3000,
    });
  }
}
