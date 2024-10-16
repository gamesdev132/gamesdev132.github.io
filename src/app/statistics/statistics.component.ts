import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RoundScoresRatio } from "app/@shared/interface/roundScoresRatio";
import { TrioRatio } from "app/@shared/interface/trioRatio";
import { GamePointsService } from "app/@shared/services/game-points.service";
import { TrioService } from "app/@shared/services/trio.service";
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";
import { PodiumComponent } from './podium/podium.component';
import { PointGamesComponent } from "../latest-scores/point-games/point-games.component";
import { StatisticsPointGamesComponent } from "./statistics-point-games/statistics-point-games.component";
import { StatisticsTrioComponent } from "./statistics-trio/statistics-trio.component";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, DropdownModule, FormsModule, PodiumComponent, PointGamesComponent, StatisticsPointGamesComponent, StatisticsTrioComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  trioRatios: TrioRatio[] = [];
  sixQuiPrendRatios: RoundScoresRatio[] = [];

  constructor(private trioService: TrioService, private gamePointsService: GamePointsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getRatios();
  }

  private async getRatios(): Promise<void> {
    await this.trioService.getRatios().then((value) => {
      this.trioRatios = value;
    });
    await this.gamePointsService.getRatios().then((value) => {
      this.sixQuiPrendRatios = value;
    });
  }
}
