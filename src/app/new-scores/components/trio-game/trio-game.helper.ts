import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Trio } from "app/@shared/interface/trio";
import { TrioPlayer } from "app/@shared/interface/trioPlayer";
import { Timestamp } from "firebase/firestore";

export class TrioGameHelper {
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

  isDuo(): boolean{
    return this.form.get('isDuo')?.value
  }

  initializeForm(): void {
    this.form = new FormGroup<any>({
      players: new FormArray([], [Validators.minLength(3), Validators.maxLength(7)]),
      isDuo: new FormControl(false)
    });

    for (let i: number = 0; i < 3; i++) {
      this.addPlayer();
    }
  }

  addPlayer(): void {
    if (this.players.length < 7) {
      this.players.push(this.createEntity());
    }
  }

  removePlayer(): void {
    if (this.players.length > 3) {
      const index: number = (this.players?.value as TrioPlayer[]).findIndex((player: TrioPlayer) => !player.name)
      this.players.removeAt(index);
    }
  }

  formatForAPI(): Trio {
    const players: TrioPlayer[] = this.form.get('players')?.value as TrioPlayer[] ?? []

    const trioGame = {
      players: players.map((player: TrioPlayer) => player.name),
      winner: players.find((player: TrioPlayer) => player.win)?.name ?? '',
      date: Timestamp.now()
    } as Trio

    const isDuoValue = this.form.get('isDuo')?.value;
    if (isDuoValue) {
      trioGame.isDuo = isDuoValue;
    }

    return trioGame
  }

  private createEntity(): FormGroup {
    return new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      win: new FormControl(false)
    });
  }
}
