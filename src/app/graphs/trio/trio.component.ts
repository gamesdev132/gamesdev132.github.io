import { Component, OnInit } from '@angular/core';
import { TrioRatio } from "app/@shared/interface/trioRatio";
import { TrioService } from "app/@shared/services/trio.service";
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css'
})
export class TrioComponent implements OnInit {
  data: any;
  options: any;

  constructor(private trioService: TrioService) {
  }

  async ngOnInit(): Promise<void> {
    const ratios: TrioRatio[] = await this.trioService.getRatios();
    console.log(ratios)
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.data = {
      labels: ratios.map((value: TrioRatio) => value.playerName),
      datasets: [
        {
          label: 'Parties gagnées',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: ratios.map((value: TrioRatio) => value.wins)
        },
        {
          label: 'Parties perdues',
          backgroundColor: documentStyle.getPropertyValue('--blue-300'),
          data: ratios.map((value: TrioRatio) => value.gamesPlayed - value.wins)
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
}
