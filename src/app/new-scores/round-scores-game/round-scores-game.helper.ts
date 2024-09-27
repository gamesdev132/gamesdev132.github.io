import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { TrioPlayer } from "app/@shared/interface/trioPlayer";

export class RoundScoresGameHelper {
  private form!: FormGroup;

  constructor() {
    this.initializeForm();
  }

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  getForm(): FormGroup {
    return this.form;
  }

  initializeForm(): void {
    this.form = new FormGroup<any>({
      players: new FormArray([], [Validators.minLength(3), Validators.maxLength(7)])
    });

    for (let i: number = 0; i < 3; i++) {
      this.addPlayer();
    }
  }

  addPlayer(): void {
    if (this.players.length < 12) {
      this.players.push(this.createEntity());
    }
  }

  addRound(): void {
    this.players.controls.forEach((player) => {
      const pointsArray = player.get('points') as FormArray;
      pointsArray.push(new FormControl(null));
    })
  }

  removePlayer(): void {
    if (this.players.length > 3) {
      const index: number = (this.players?.value as TrioPlayer[]).findIndex((player: TrioPlayer) => !player.name)
      this.players.removeAt(index);
    }
  }

  private createEntity(): FormGroup {
    return new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      points: new FormArray([
        new FormControl(null),
      ]),
      total: new FormControl(null),
    });
  }
}
