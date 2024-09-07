import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { TrioService } from "../@shared/services/trio.service";
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, DropdownModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent{
}
