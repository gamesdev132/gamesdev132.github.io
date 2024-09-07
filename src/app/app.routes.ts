import { Routes } from '@angular/router';
import { StatisticsComponent } from "./statistics/statistics.component";
import { NewGameScoresComponent } from "./new-scores/new-game-scores/new-game-scores.component";
import { ChooseGameComponent } from "./new-scores/choose-game/choose-game.component";

export const routes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'scores', component: NewGameScoresComponent },
  { path: 'addScores', component: ChooseGameComponent },
];
