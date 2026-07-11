import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MegaMenuModule,
    RouterLink,
    RouterLinkActive,
    ButtonDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Statistiques',
        root: true,
        routerLink: '/',
      },
      {
        label: 'Scores',
        root: true,
        routerLink: '/scores',
      },
    ];
  }

  get showAddButton(): boolean {
    return this.router.url !== '/scores/new';
  }
}
