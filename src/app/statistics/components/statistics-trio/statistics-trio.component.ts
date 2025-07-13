import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrioRatio } from 'app/@shared/interface/trioRatio';
import { CardModule } from 'primeng/card';
import { PodiumComponent } from '../podium/podium.component';
import { RatioData } from 'app/@shared/interface/ratio-data';

@Component({
  selector: 'app-statistics-trio',
  standalone: true,
  imports: [CardModule, PodiumComponent],
  templateUrl: './statistics-trio.component.html',
  styleUrl: './statistics-trio.component.scss',
})
export class StatisticsTrioComponent implements OnChanges {
  @Input({ required: true }) trioRatios: TrioRatio[] = [];
  trioRatioData: RatioData[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trioRatios']) {
      this.initializeRatioDataTrio();
    }
  }

  private initializeRatioDataTrio() {
    this.trioRatioData = this.trioRatios.map((value) => {
      return {
        name: value.playerName,
        ratio: `${value.ratio} (${value.wins}/${value.gamesPlayed})`,
      };
    });
  }
}
