import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Ratio } from "app/@shared/interface/ratio";
import { TrioService } from "app/@shared/services/trio.service";
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, DropdownModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  ratios: Ratio[] = [];

  constructor(private trioService: TrioService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getRatios();
  }

  private async getRatios(){
    this.ratios = await this.trioService.getRatios()
  }
}
