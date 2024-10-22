import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PlayersService } from "app/@shared/services/players.service";
import { Button } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.css'
})
export class NewPlayerComponent {
  form!: FormGroup;

  constructor(private playersService: PlayersService) {
    this.form = new FormGroup<any>({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    })
  }

  get isFormDisabled(): boolean {
    return this.form.invalid
  }

  async onSave(): Promise<void> {
    if (this.form.valid) {
      await this.playersService.savePlayer(this.form.get('name')?.value);
      this.form.get('name')?.setValue('')
      this.form.markAsPristine();
    }
  }
}
