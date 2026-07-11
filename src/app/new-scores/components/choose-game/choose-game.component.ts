import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameEnum } from 'app/@shared/enums/game.enum';
import { PlayersService } from 'app/@shared/services/players.service';
import { RoundScoresGameComponent } from 'app/new-scores/components/round-scores-game/round-scores-game.component';
import { TrioGameComponent } from '../trio-game/trio-game.component';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-choose-game',
  imports: [
    CommonModule,
    FormsModule,
    TrioGameComponent,
    RoundScoresGameComponent,
    Select,
  ],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.scss',
})
export class ChooseGameComponent implements OnInit {
  gameList: GameEnum[] = [GameEnum.Hilo, GameEnum.SixQuiPrend, GameEnum.Trio];
  selectedGame: GameEnum | undefined;
  protected readonly GameEnum = GameEnum;

  constructor(private playersService: PlayersService) {}

  async ngOnInit(): Promise<void> {
    await this.playersService.initializePlayerList();
  }
}
