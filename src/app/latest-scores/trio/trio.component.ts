import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCalendarDays, faCrown, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { Trio } from "app/@shared/interface/trio";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [
    CarouselModule,
    CardModule,
    FontAwesomeModule
  ],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css'
})
export class TrioComponent {
  @Input({required: true}) scores: Trio[] = [];
  faCrown = faCrown;
  faGroup = faPeopleGroup
  faDate = faCalendarDays

  getPlayerList(players: string[]): string {
    return players.join(', ')
  }
}
