import { Component, Input } from '@angular/core';
import { GamePointsScores } from "app/@shared/interface/game-points-scores";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: 'app-point-games',
  standalone: true,
  imports: [
    CarouselModule
  ],
  templateUrl: './point-games.component.html',
  styleUrl: './point-games.component.css'
})
export class PointGamesComponent {
  @Input({required: true}) scores!: GamePointsScores[];

  getPlayerList(players: string[]): string {
    return players.join(', ')
  }
}
