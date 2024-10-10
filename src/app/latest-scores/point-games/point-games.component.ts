import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCalendarDays, faCrown, faMedal } from '@fortawesome/free-solid-svg-icons';
import { GamePointsPlayer, GamePointsScores } from "app/@shared/interface/game-points-scores";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: 'app-point-games',
  standalone: true,
  imports: [
    CarouselModule,
    FontAwesomeModule
  ],
  templateUrl: './point-games.component.html',
  styleUrl: './point-games.component.css'
})
export class PointGamesComponent {
  @Input({required: true}) scores!: GamePointsScores[];
  faMedal = faMedal;
  faDate = faCalendarDays

  getColor(player: GamePointsPlayer): string {
    if (player.isWinner) {
      return '#D4AF37'
    }
    if (player.isSecond) {
      return '#C0C0C0'
    }
    return '#614E1A'
  }
}
