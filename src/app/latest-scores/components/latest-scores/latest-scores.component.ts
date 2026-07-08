import { Component, OnInit } from '@angular/core';
import { GameEnum } from 'app/@shared/enums/game.enum';
import { GamePointsScores } from 'app/@shared/interface/game-points-scores';
import { Trio } from 'app/@shared/interface/trio';
import { GamePointsService } from 'app/@shared/services/game-points.service';
import { TrioService } from 'app/@shared/services/trio.service';
import { EmptyStateComponent } from 'app/latest-scores/components/empty-state/empty-state.component';
import { PointGamesComponent } from 'app/latest-scores/components/point-games/point-games.component';
import { TrioComponent } from 'app/latest-scores/components/trio/trio.component';
import { CarouselModule } from 'primeng/carousel';
import { TitleCardComponent } from 'app/latest-scores/components/title-card/title-card.component';
import { fa6, faArrowUp19, faCubes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-latest-scores',
  standalone: true,
  imports: [
    TrioComponent,
    PointGamesComponent,
    CarouselModule,
    EmptyStateComponent,
    TitleCardComponent,
  ],
  templateUrl: './latest-scores.component.html',
  styleUrl: './latest-scores.component.scss',
})
export class LatestScoresComponent implements OnInit {
  trioScores: Trio[] = [];
  sixQuiPrendScores: GamePointsScores[] = [];
  hiloScores: GamePointsScores[] = [];
  protected readonly fa6 = fa6;
  protected readonly faCubes = faCubes;
  protected readonly faArrowUp19 = faArrowUp19;

  constructor(
    private trioService: TrioService,
    private gamePointsService: GamePointsService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getTrioLatestScores();
    await this.getSixQuiPrendLatestScores();
    await this.getHiloLatestScores();
  }

  private async getTrioLatestScores(): Promise<void> {
    this.trioScores = await this.trioService.getScores();
  }

  private async getSixQuiPrendLatestScores(): Promise<void> {
    this.sixQuiPrendScores =
      await this.gamePointsService.getScoresFromLastXDays(GameEnum.SixQuiPrend);
  }

  private async getHiloLatestScores(): Promise<void> {
    this.hiloScores = await this.gamePointsService.getScoresFromLastXDays(
      GameEnum.Hilo,
    );
  }
}
