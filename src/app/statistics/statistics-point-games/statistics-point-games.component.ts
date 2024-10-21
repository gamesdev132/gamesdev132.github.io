import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoundScoresRatio } from 'app/@shared/interface/roundScoresRatio';
import { PodiumComponent } from "app/statistics/podium/podium.component";
import { CardModule } from 'primeng/card';
import { RatioData } from 'app/@shared/interface/ratio-data';

@Component({
  selector: 'app-statistics-point-games',
  standalone: true,
  imports: [PodiumComponent, CardModule],
  templateUrl: './statistics-point-games.component.html',
  styleUrl: './statistics-point-games.component.css'
})
export class StatisticsPointGamesComponent implements OnChanges{
  @Input({required: true}) gamesListRatio!: RoundScoresRatio[];
  @Input({required: true}) gameName!: string;
  bestPointGamesRatios: RatioData[] = []
  topThreePointGamesRatios: RoundScoresRatio[] = []
  worstPointGamesRatios: RoundScoresRatio[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gamesListRatio']){
      this.initializeRatioDataLists()
    }
  }

  private initializeRatioDataLists() : void{
    this.bestPointGamesRatios = this.gamesListRatio
      .sort((ratio1, ratio2) => {
        if (ratio1.wins > ratio2.wins) return -1;
        if (ratio1.wins < ratio2.wins) return 1;
        if (ratio1.gamesPlayed < ratio2.gamesPlayed) return -1;
        if (ratio1.gamesPlayed > ratio2.gamesPlayed) return 1;
        if (ratio1.defeats < ratio2.defeats) return -1;
        if (ratio1.defeats > ratio2.defeats) return 1;
        return 0;
      })
      .filter((value) => value.wins > 0).map((value) => {
          return {
          name: value.playerName,
          ratio: `(${value.wins}/${value.gamesPlayed})`
        }
      })

    this.topThreePointGamesRatios = this.gamesListRatio
      .filter((ratio) => ratio.topThree > 0)
      .sort((ratio1, ratio2) => {
        if (ratio1.topThree > ratio2.topThree) return -1;
        if (ratio1.topThree < ratio2.topThree) return 1;
        if (ratio1.gamesPlayed < ratio2.gamesPlayed) return -1
        if (ratio1.gamesPlayed > ratio2.gamesPlayed) return 1
        if (ratio1.wins > ratio2.wins) return -1;
        if (ratio1.wins < ratio2.wins) return 1;
        if (ratio1.defeats > ratio2.defeats) return -1
        if (ratio1.defeats < ratio2.defeats) return 1
        return 0;
      })
      .slice(0,3)

    this.worstPointGamesRatios = this.gamesListRatio.filter((value) => value.defeats != 0)
      .sort((ratio1, ratio2) => {
        if (ratio1.defeats < ratio2.defeats) return -1;
        if (ratio1.defeats > ratio2.defeats) return 1;
        if (ratio1.wins > ratio2.wins) return -1;
        if (ratio1.wins < ratio2.wins) return 1;
        if (ratio1.gamesPlayed > ratio2.gamesPlayed) return -1;
        if (ratio1.gamesPlayed < ratio2.gamesPlayed) return 1;
        return 0;
      })
      .reverse()
  }
}
