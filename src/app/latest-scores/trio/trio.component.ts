import { Component, OnInit } from '@angular/core';
import { Trio } from "app/@shared/interface/trio";
import { TrioService } from "app/@shared/services/trio.service";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [
    CarouselModule,
    CardModule
  ],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css'
})
export class TrioComponent implements OnInit {
  games: Trio[] = [];

  constructor(private trioService: TrioService) {
  }


  async ngOnInit(): Promise<void> {
    await this.getGamesFromLastMast();
  }

  private async getGamesFromLastMast(): Promise<void> {
    await this.trioService.getGamesFromLastXDays().then((value: Trio[]): void => {
      this.games = value;
    });
  }
}
