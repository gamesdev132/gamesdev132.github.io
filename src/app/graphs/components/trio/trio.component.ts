import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TrioRatio } from "app/@shared/interface/trioRatio";
import { TrioService } from "app/@shared/services/trio.service";
import { ChartModule } from "primeng/chart";
import { DropdownModule } from "primeng/dropdown";

export enum ChartType {
  WON = 'Parties gagnées', PLAYED_AND_WON = 'Parties jouées et gagnées', RATIOS = 'Ratios'
}

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [
    ChartModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css'
})
export class TrioComponent implements OnInit {
  data: any;
  options: any;
  chartTypes: any[];
  charTypeName: "bar" | "doughnut" = "bar";
  selectedChartType: ChartType = ChartType.PLAYED_AND_WON;
  ratios: TrioRatio[] = [];

  constructor(private trioService: TrioService) {
    this.chartTypes = [ChartType.PLAYED_AND_WON, ChartType.WON, ChartType.RATIOS]
  }

  async ngOnInit(): Promise<void> {
    this.ratios = await this.trioService.getRatios();
    this.setChar();

  }

  setChar(): void {
    switch (this.selectedChartType) {
      case ChartType.WON:
        this.setWonChar();
        break;
      case ChartType.PLAYED_AND_WON:
        this.setPlayedAndWonChar();
        break;
      case ChartType.RATIOS:
        this.setRatiosChar();
        break;
      default:
        this.setPlayedAndWonChar();
    }
  }

  private setWonChar(): void {
    this.charTypeName = "doughnut"
    this.data = {
      labels: this.ratios.filter((ratio) => ratio.wins > 0).map((ratio: TrioRatio) => ratio.playerName),
      datasets: [
        {
          data: this.ratios.filter((ratio) => ratio.wins > 0).map((ratio) => ratio.wins),
        }
      ]
    };


    this.options = {
      cutout: '60%',
    };
  }

  private setPlayedAndWonChar(): void {
    this.charTypeName = "bar"

    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.data = {
      labels: this.ratios.map((value: TrioRatio) => value.playerName),
      datasets: [
        {
          label: 'Parties gagnées',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.ratios.map((value: TrioRatio) => value.wins)
        },
        {
          label: 'Parties perdues',
          backgroundColor: documentStyle.getPropertyValue('--blue-300'),
          data: this.ratios.map((value: TrioRatio) => value.gamesPlayed - value.wins)
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          grid: {
            drawBorder: false
          }
        }
      }
    };
  }

  private setRatiosChar(): void {
    this.charTypeName = "bar"

    this.data = {
      labels: this.ratios.map((ratio) => ratio.playerName),
      datasets: [
        {
          label: 'Ratio',
          data: this.ratios.map((ratio) => ratio.ratio),
          borderWidth: 1
        },
      ]
    };

    this.options = {};
  }
}
