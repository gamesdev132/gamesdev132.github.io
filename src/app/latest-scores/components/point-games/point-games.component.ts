import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faMedal,
} from '@fortawesome/free-solid-svg-icons';
import {
  GamePointsPlayer,
  GamePointsScores,
} from 'app/@shared/interface/game-points-scores';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-point-games',
  standalone: true,
  imports: [CarouselModule, FontAwesomeModule],
  templateUrl: './point-games.component.html',
  styleUrl: './point-games.component.scss',
})
export class PointGamesComponent implements OnInit {
  @Input({ required: true }) scores!: GamePointsScores[];
  faMedal = faMedal;
  faDate = faCalendarDays;
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '2500px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1300px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getColor(player: GamePointsPlayer): string {
    if (player.isWinner) {
      return '#D4AF37';
    }
    if (player.isSecond) {
      return '#C0C0C0';
    }
    return '#614E1A';
  }
}
