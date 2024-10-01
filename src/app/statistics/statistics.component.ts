import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RoundScoresRatio } from "app/@shared/interface/roundScoresRatio";
import { TrioRatio } from "app/@shared/interface/trioRatio";
import { GamePointsService } from "app/@shared/services/game-points.service";
import { TrioService } from "app/@shared/services/trio.service";
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, DropdownModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  trioRatios: TrioRatio[] = [];
  sixQuiPrendRatios: RoundScoresRatio[] = [];

  constructor(private trioService: TrioService, private gamePointsService: GamePointsService) {
  }

  get bestSixQuiPrendPlayerList(){
   return this.sixQuiPrendRatios.sort((ratio1, ratio2) => {
      if (ratio1.wins > ratio2.wins) return -1;
      if (ratio1.wins < ratio2.wins) return 1;
      if (ratio1.gamesPlayed < ratio2.gamesPlayed) return -1;
      if (ratio1.gamesPlayed > ratio2.gamesPlayed) return 1;
      return 0;
    }).slice(0, 3)
  }

  get worstSixQuiPrendPlayerList(){
    return this.sixQuiPrendRatios.sort((ratio1, ratio2) => {
      if (ratio1.defeats > ratio2.defeats) return -1;
      if (ratio1.defeats < ratio2.defeats) return 1;
      if (ratio1.gamesPlayed < ratio2.gamesPlayed) return -1;
      if (ratio1.gamesPlayed > ratio2.gamesPlayed) return 1;
      return 0;
    }).slice(0, 3)
  }

  async ngOnInit(): Promise<void> {
    await this.getRatios();
  }

  private async getRatios(): Promise<void> {
    this.trioRatios = await this.trioService.getRatios();
    this.sixQuiPrendRatios = await this.gamePointsService.getRatios();
    console.log(this.sixQuiPrendRatios)
  }
}
