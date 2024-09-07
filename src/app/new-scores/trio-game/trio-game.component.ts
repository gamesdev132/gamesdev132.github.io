import { NgClass } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TrioPlayer } from "app/@shared/interface/trioPlayer";
import { TrioService } from "app/@shared/services/trio.service";
import { Button } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TrioGameHelper } from "./trio-game.helper";

@Component({
  selector: 'app-trio-game',
  standalone: true,
  imports: [FormsModule, InputTextModule, Button, ReactiveFormsModule, NgClass],
  templateUrl: './trio-game.component.html',
  styleUrl: './trio-game.component.css'
})
export class TrioGameComponent implements OnInit {
  formHelper!: TrioGameHelper;

  constructor(private trioService: TrioService, private router: Router) {
  }

  ngOnInit(): void {
    this.formHelper = new TrioGameHelper();
  }

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  get form(): FormGroup {
    return this.formHelper.getForm();
  }

  get playersLength(): number {
    return this.players.controls.length;
  }

  get disablePlayerAdding(): boolean {
    return this.players.controls.length === 7 || this.form.invalid;
  }

  get disablePlayerRemoving(): boolean {
    return this.players.controls.length === 3 || !this.players.value.find((player: TrioPlayer) => !player.name);
  }

  get isFormDisabled(): boolean {
    return this.form.invalid || !this.players.value.find((player: TrioPlayer) => player.win)
  }

  toggleWin(index: number): void {
    this.players.controls.forEach((player: AbstractControl<any>, i: number): void => {
      const winControl = player.get('win');

      if (winControl) {
        if (i === index) {
          winControl.setValue(!winControl.value);
        } else {
          winControl.setValue(false)
        }
      }
    });
  }

  addPlayer(): void {
    this.formHelper.addPlayer()
  }

  removePlayer(): void {
    this.formHelper.removePlayer()
  }

  async saveGame(): Promise<void> {
    await this.trioService.saveGame(this.formHelper.formatForAPI()).then((): void => {
      this.router.navigate(['/'])
    })
  }
}
