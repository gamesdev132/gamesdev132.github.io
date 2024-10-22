import { Routes } from '@angular/router';
import { TrioComponent } from "app/graphs/trio/trio.component";
import { LatestScoresComponent } from "app/latest-scores/latest-scores/latest-scores.component";
import { NewPlayerComponent } from "app/players/new-player/new-player.component";
import { ChooseGameComponent } from "./new-scores/choose-game/choose-game.component";
import { StatisticsComponent } from "./statistics/components/statistics.component";

export const routes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'scores', component: LatestScoresComponent},
  {path: 'scores/new', component: ChooseGameComponent},
  {path: 'player/new', component: NewPlayerComponent},
  {path: 'stats', component: TrioComponent}
];
