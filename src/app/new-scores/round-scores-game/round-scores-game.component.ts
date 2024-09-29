import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Event } from "@angular/router";
import { TrioPlayer } from "app/@shared/interface/trioPlayer";
import { SixQuiPrendParams } from "app/@shared/params/game-points-parms";
import { GamePointsService } from "app/@shared/services/game-points.service";
import { PlayersService } from "app/@shared/services/players.service";
import { RoundScoresGameHelper } from "app/new-scores/round-scores-game/round-scores-game.helper";
import { Button } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-round-scores-game',
  standalone: true,
  imports: [
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    InputNumberModule,
    Button
  ],
  templateUrl: './round-scores-game.component.html',
  styleUrl: './round-scores-game.component.css'
})
export class RoundScoresGameComponent implements OnInit {
  formHelper!: RoundScoresGameHelper;
  playerList: string[] = [];

  constructor(private playersService: PlayersService, private gamePointsService: GamePointsService) {
  }

  async ngOnInit(): Promise<void> {
    this.formHelper = new RoundScoresGameHelper(SixQuiPrendParams);
    this.playerList = await this.playersService.getPlayerList()
  }

  get isFormDisabled(): boolean {
    return this.form.invalid
  }

  get players(): FormArray {
    return this.form.get(this.formHelper.PLAYERS_KEY) as FormArray;
  }

  get form(): FormGroup {
    return this.formHelper.getForm();
  }

  get disablePlayerAdding(): boolean {
    return this.players.controls.length === SixQuiPrendParams.maximumPlayers
  }

  get disablePlayerRemoving(): boolean {
    return this.players.controls.length === SixQuiPrendParams.minimumPlayers
  }

  updatePlayerTotal(index: number): void {
    const points = this.players.at(index).get(this.formHelper.PLAYERS_POINTS_KEY) as FormArray
    let total = 0;
    points.controls.forEach((val) => {
      total += val.value;
    })
    this.players.at(index).get('total')?.setValue(total)
  }

  get numberOfRounds() : number{
    return this.formHelper.numberOfRounds;
  }

  getPoints(playerIndex: number) {
    return (this.players.at(playerIndex).get(this.formHelper.PLAYERS_POINTS_KEY) as FormArray).controls as FormControl[];
  }

  addPlayer(): void {
    this.formHelper.addPlayer()
  }

  removePlayer(): void {
    this.formHelper.removePlayer()
  }

  addRound(): void {
    this.formHelper.addRound()
  }

  async submit(): Promise<void> {
    await this.gamePointsService.saveGame(this.formHelper.formatForAPI(), 'SixQuiPrend');
  }
}
