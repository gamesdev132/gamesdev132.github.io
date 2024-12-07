import { Component, Input } from '@angular/core';
import { RatioData } from 'app/@shared/interface/ratio-data';

@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
})
export class PodiumComponent {
  @Input({ required: true }) podiumData!: RatioData[];

  get firstPlayerName(): string {
    return this.podiumData[0] ? this.podiumData[0].name : '';
  }

  get secondPlayerName(): string {
    return this.podiumData[1] ? this.podiumData[1].name : '';
  }

  get thirdPlayerName(): string {
    return this.podiumData[2] ? this.podiumData[2].name : '';
  }

  get firstPlayerRatio(): string {
    return this.podiumData[0] ? this.podiumData[0].ratio : '';
  }

  get secondPlayerRatio(): string {
    return this.podiumData[1] ? this.podiumData[1].ratio : '';
  }

  get thirdPlayerRatio(): string {
    return this.podiumData[2] ? this.podiumData[2].ratio : '';
  }
}
