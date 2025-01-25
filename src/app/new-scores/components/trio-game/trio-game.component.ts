import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TrioPlayer } from 'app/@shared/interface/trioPlayer';
import { PlayersService } from 'app/@shared/services/players.service';
import { TrioService } from 'app/@shared/services/trio.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { TrioGameHelper } from '../../helpers/trio-game.helper';

@Component({
  selector: 'app-trio-game',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    InputSwitchModule,
    ConfirmDialogModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './trio-game.component.html',
  styleUrl: './trio-game.component.css',
})
export class TrioGameComponent implements OnInit {
  formHelper!: TrioGameHelper;
  playerList: string[] = [];
  messages!: Message[];

  constructor(
    private trioService: TrioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private playersService: PlayersService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.messages = [
      {
        severity: 'info',
        detail: 'Il faut toujours enregistré les deux parties en mode Duo :)',
      },
    ];
    this.formHelper = new TrioGameHelper();
    this.playersService.activePlayers.subscribe(players => {
      this.playerList = players;
    });
  }

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  get form(): FormGroup {
    return this.formHelper.getForm();
  }

  get disablePlayerAdding(): boolean {
    return this.players.controls.length === 7 || this.form.invalid;
  }

  get disablePlayerRemoving(): boolean {
    return (
      this.players.controls.length === 3 ||
      !this.players.value.find((player: TrioPlayer) => !player.name)
    );
  }

  get isFormDisabled(): boolean {
    return (
      this.form.invalid ||
      !this.players.value.find((player: TrioPlayer) => player.win)
    );
  }

  toggleWin(index: number): void {
    this.players.controls.forEach(
      (player: AbstractControl<any>, i: number): void => {
        const winControl = player.get('win');

        if (winControl) {
          if (i === index) {
            winControl.setValue(!winControl.value);
          } else {
            winControl.setValue(false);
          }
        }
      },
    );
  }

  resetWinner(): void {
    this.players.controls.forEach((player: AbstractControl<any>): void => {
      player.get('win')?.setValue(false);
    });
  }

  addPlayer(): void {
    this.formHelper.addPlayer();
  }

  removePlayer(): void {
    this.formHelper.removePlayer();
  }

  saveGame(event: Event): void {
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
    await this.trioService
      .saveGame(this.formHelper.formatForAPI())
      .then((): void => {
        this.showMessage();
        this.resetWinner();
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
