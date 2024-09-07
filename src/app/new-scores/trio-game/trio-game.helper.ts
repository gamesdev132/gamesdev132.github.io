import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Trio } from "../../@shared/interface/trio";
import { Timestamp } from "firebase/firestore";
import { Player } from "../../@shared/interface/player";

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

  initializeForm(): void {
    this.form = new FormGroup<any>({
      players: new FormArray([], [Validators.minLength(3), Validators.maxLength(7)])
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

  removePlayer(index: number): void {
    if (this.players.length > 3) {
      this.players.removeAt(index);
    }
  }

  formatForAPI(): Trio {
    const players: Player[] = this.form.get('players')?.value as Player[] ?? []

    return {
      players: players.map((player: Player) => player.name),
      winner: players.find((player: Player) => player.win)?.name ?? '',
      date: Timestamp.now()
    }
  }

  private createEntity(): FormGroup {
    return new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      win: new FormControl(false)
    });
  }
}
