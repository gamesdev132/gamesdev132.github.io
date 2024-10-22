import { Component, OnInit } from '@angular/core';
import { GamePointsScores } from "app/@shared/interface/game-points-scores";
import { Trio } from "app/@shared/interface/trio";
import { GamePointsService } from "app/@shared/services/game-points.service";
import { TrioService } from "app/@shared/services/trio.service";
import { EmptyStateComponent } from "app/latest-scores/components/empty-state/empty-state.component";
import { PointGamesComponent } from "app/latest-scores/components/point-games/point-games.component";
import { TrioComponent } from "app/latest-scores/components/trio/trio.component";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: 'app-latest-scores',
  standalone: true,
  imports: [TrioComponent, PointGamesComponent, CarouselModule, EmptyStateComponent],
  templateUrl: './latest-scores.component.html',
  styleUrl: './latest-scores.component.css'
})
export class LatestScoresComponent implements OnInit {
  trioScores: Trio[] = [];
  sixQuiPrendScores: GamePointsScores[] = [];
  hiloScores: GamePointsScores[] = [];

  constructor(private trioService: TrioService, private gamePointsService: GamePointsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getTrioLatestScores()
    await this.getSixQuiPrendLatestScores()
    await this.getHiloLatestScores()
  }

  private async getTrioLatestScores(): Promise<void> {
    this.trioScores = await this.trioService.getScoresFromLastXDays();
  }

  private async getSixQuiPrendLatestScores(): Promise<void> {
    this.sixQuiPrendScores = await this.gamePointsService.getScoresFromLastXDays('SixQuiPrend');
  }

  private async getHiloLatestScores(): Promise<void> {
    this.hiloScores = await this.gamePointsService.getScoresFromLastXDays('Hilo');
  }
}
