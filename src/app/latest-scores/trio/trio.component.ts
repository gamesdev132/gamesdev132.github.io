import { Component, Input, OnInit } from '@angular/core';
import { Trio } from "app/@shared/interface/trio";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [
    CarouselModule,
    CardModule
  ],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css'
})
export class TrioComponent {
  @Input({required: true}) scores: Trio[] = [];

  getPlayerList(players: string[]): string {
    return players.join(', ')
  }
}
