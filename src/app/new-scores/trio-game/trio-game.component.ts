import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TrioService } from "app/@shared/services/trio.service";
import { Button } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TrioGameHelper } from "./trio-game.helper";

@Component({
  selector: 'app-trio-game',
  standalone: true,
  imports: [FormsModule, InputTextModule, Button, ReactiveFormsModule],
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

  toggleWin(index: number): void {
    this.players.controls.forEach((entity, idx) => {
      const winControl = entity.get('win');

      if (winControl) {
        if (idx === index) {
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

  async saveGame(): Promise<void> {
    await this.trioService.saveGame(this.formHelper.formatForAPI()).then((): void => {
      this.router.navigate(['/'])
    })
  }
}
