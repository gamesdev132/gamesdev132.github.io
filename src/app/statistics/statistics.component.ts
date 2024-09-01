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
export class StatisticsComponent implements OnInit{
  cities: City[] | undefined;

  constructor(private trioService: TrioService) {}

  async ngOnInit() {
    console.log('trio', await this.trioService.getGamesFromLastXDays(-31));
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
}
