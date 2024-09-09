import { Routes } from '@angular/router';
import { LatestScoresComponent } from "app/latest-scores/latest-scores/latest-scores.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ChooseGameComponent } from "./new-scores/choose-game/choose-game.component";

export const routes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'scores', component: LatestScoresComponent },
  { path: 'addScores', component: ChooseGameComponent },
];
