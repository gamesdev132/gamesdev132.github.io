import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewGameScoresComponent } from "./new-scores/new-game-scores/new-game-scores.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { MegaMenuModule } from "primeng/megamenu";
import { MegaMenuItem } from "primeng/api";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NewGameScoresComponent, StatisticsComponent, MegaMenuModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Statistiques',
        root: true,
        routerLink: '/'
      },
      {
        label: 'Scores',
        root: true,
        routerLink: '/scores'
      },
    ];
  }
}
