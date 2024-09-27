import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
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

  constructor(private playersService: PlayersService) {
  }

  async ngOnInit(): Promise<void> {
    this.formHelper = new RoundScoresGameHelper();
    console.log(this.getControl(1))
    this.playerList = await this.playersService.getPlayerList()
  }

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  get form(): FormGroup {
    return this.formHelper.getForm();
  }

  getPoints(playerIndex: number) {
    return (this.players.at(playerIndex).get('points') as FormArray).controls as FormControl[];
  }

  getControl(i: number){
    console.log(this.players.controls[i])
    return this.players.controls[i]?.value.name;
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
}
