import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { GamePointsParams } from "app/@shared/interface/game-points-params";
import { GamePointsPlayer, GamePointsScores } from "app/@shared/interface/game-points-scores";
import { TrioPlayer } from "app/@shared/interface/trioPlayer";
import { Timestamp } from "firebase/firestore";

export class RoundScoresGameHelper {
  readonly PLAYERS_KEY = 'players'
  readonly PLAYERS_POINTS_KEY = 'points'
  private form!: FormGroup;
  numberOfRounds: number = 1;
  gameParameters: GamePointsParams;

  constructor(gameParams: GamePointsParams) {
    this.gameParameters = gameParams;
    this.initializeForm();
  }

  get players(): FormArray {
    return this.form.get(this.PLAYERS_KEY) as FormArray;
  }

  getForm(): FormGroup {
    return this.form;
  }

  initializeForm(): void {
    this.form = new FormGroup<any>({
      players: new FormArray([], [Validators.minLength(3), Validators.maxLength(7)])
    });

    for (let i: number = 0; i < this.gameParameters.minimumPlayers; i++) {
      this.addPlayer();
    }
  }

  addPlayer(): void {
    if (this.players.length < this.gameParameters.maximumPlayers) {
      this.players.push(this.createEntity());
    }
  }

  removePlayer(): void {
    if (this.players.length > this.gameParameters.minimumPlayers) {
      const index: number = (this.players?.value as TrioPlayer[]).findIndex((player: TrioPlayer) => !player.name)
      this.players.removeAt(index);
    }
  }

  addRound(): void {
    this.players.controls.forEach((player) => {
      const pointsArray = player.get(this.PLAYERS_POINTS_KEY) as FormArray;
      pointsArray.push(new FormControl(null, Validators.required));
    })
    this.numberOfRounds += 1
  }

  formatForAPI(): GamePointsScores {
    const players: GamePointsPlayer[] = this.players.getRawValue().map((player: any) => {
      return {
        name: player.name,
        total: player.total,
      };
    }).sort((player1: GamePointsPlayer, player2: GamePointsPlayer) => player1.total - player2.total);
    return {
      players: players,
      date: Timestamp.now()
    };
  }

  private createEntity(): FormGroup {
    return new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      points: new FormArray(Array.from({ length: this.numberOfRounds }, () => new FormControl(null, Validators.required))
    ),
      total: new FormControl({value: null, disabled: true}),
    });
  }
}
