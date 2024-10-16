import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPointGamesComponent } from './statistics-point-games.component';

describe('StatisticsPointGamesComponent', () => {
  let component: StatisticsPointGamesComponent;
  let fixture: ComponentFixture<StatisticsPointGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsPointGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsPointGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
