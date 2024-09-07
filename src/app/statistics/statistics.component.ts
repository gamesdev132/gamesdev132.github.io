import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, DropdownModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
}
