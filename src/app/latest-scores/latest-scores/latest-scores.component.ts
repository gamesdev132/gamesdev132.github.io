import { Component } from '@angular/core';
import { TrioComponent } from "app/latest-scores/trio/trio.component";

@Component({
  selector: 'app-latest-scores',
  standalone: true,
  imports: [TrioComponent],
  templateUrl: './latest-scores.component.html',
  styleUrl: './latest-scores.component.css'
})
export class LatestScoresComponent {

}
