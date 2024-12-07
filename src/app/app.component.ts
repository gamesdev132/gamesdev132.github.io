import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MegaMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
