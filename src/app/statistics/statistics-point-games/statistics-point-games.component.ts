import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoundScoresRatio } from 'app/@shared/interface/roundScoresRatio';
import { PodiumComponent } from "app/statistics/podium/podium.component";
import { CardModule } from 'primeng/card';
import { RatioData } from 'app/@shared/interface/ratio-data';
import { SortCriteria } from '../interfaces/sort-criteria.interface';
import { Order } from '../enums/order.enum';
import { FilterKey } from '../enums/filter-key.enum';

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
      .sort(this.sortBy([
        {key: FilterKey.Wins, order: Order.Desc}, 
        {key: FilterKey.GamesPlayed, order: Order.Asc},
        {key: FilterKey.Defeats, order: Order.Desc}, 
        {key: FilterKey.TopThree, order: Order.Desc}
      ]))
      .filter((value) => value.wins > 0).map((value) => {
          return {
          name: value.playerName,
          ratio: `(${value.wins}/${value.gamesPlayed})`
        }
      })

    this.topThreePointGamesRatios = this.gamesListRatio
      .filter((ratio) => ratio.topThree > 0)
      .sort(this.sortBy([
        {key: FilterKey.TopThree, order: Order.Desc}, 
        {key: FilterKey.GamesPlayed, order: Order.Asc},
        {key: FilterKey.Wins, order: Order.Desc}, 
        {key: FilterKey.Defeats, order: Order.Desc}
      ]))
      .slice(0,3)

    this.worstPointGamesRatios = this.gamesListRatio
    .filter((value) => value.defeats != 0)
      .sort(this.sortBy([
        {key: FilterKey.Defeats, order: Order.Asc}, 
        {key: FilterKey.Wins, order: Order.Desc}, 
        {key: FilterKey.GamesPlayed, order: Order.Desc}
      ]))
      .reverse()
  }

  private sortBy(criteriaList: SortCriteria[]) {
    return (ratio1: RoundScoresRatio, ratio2: RoundScoresRatio): number => {
      for (const { key, order } of criteriaList) {
        const compare = order === Order.Asc ? ratio1[key] - ratio2[key] : ratio2[key] - ratio1[key];
        if (compare !== 0) return compare;
      }
      return 0;
    };
  }
}
