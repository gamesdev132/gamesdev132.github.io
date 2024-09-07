import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { GameEnum } from "app/@shared/enums/game";
import { DropdownModule } from "primeng/dropdown";
import { TrioGameComponent } from "../trio-game/trio-game.component";

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    TrioGameComponent
  ],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css'
})
export class ChooseGameComponent {
  gameList: GameEnum[] = [GameEnum.Hilo, GameEnum.SixQuiPrend, GameEnum.Trio];
  selectedGame: GameEnum | undefined;
  protected readonly GameEnum = GameEnum;
}
