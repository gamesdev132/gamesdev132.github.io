import { Routes } from '@angular/router';
import { StatisticsComponent } from "./statistics/statistics.component";
import { NewGameScoresComponent } from "./new-game-scores/new-game-scores.component";

export const routes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'scores', component: NewGameScoresComponent },
  { path: 'addScores', component: NewGameScoresComponent },
];
