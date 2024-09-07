import { NgClass } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MegaMenuItem } from "primeng/api";
import { MegaMenuModule } from "primeng/megamenu";
import { NewGameScoresComponent } from "./new-scores/new-game-scores/new-game-scores.component";
import { StatisticsComponent } from "./statistics/statistics.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NewGameScoresComponent, StatisticsComponent, MegaMenuModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
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

  get showAddButton(): boolean {
    return this.router.url !== '/addScores'
  }
}
