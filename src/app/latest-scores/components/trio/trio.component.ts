import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faCrown,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { Trio } from 'app/@shared/interface/trio';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-trio',
  standalone: true,
  imports: [CarouselModule, CardModule, FontAwesomeModule, TagModule],
  templateUrl: './trio.component.html',
  styleUrl: './trio.component.css',
})
export class TrioComponent implements OnInit {
  @Input({ required: true }) scores: Trio[] = [];
  faCrown = faCrown;
  faGroup = faPeopleGroup;
  faDate = faCalendarDays;

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1850px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1100px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '750px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getPlayerList(players: string[]): string {
    return players.join(', ');
  }
}
