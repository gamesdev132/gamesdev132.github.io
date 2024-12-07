import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-new-game-scores',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './new-game-scores.component.html',
  styleUrl: './new-game-scores.component.css',
})
export class NewGameScoresComponent {}
