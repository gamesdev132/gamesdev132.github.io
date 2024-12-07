import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTrioComponent } from './statistics-trio.component';

describe('StatisticsTrioComponent', () => {
  let component: StatisticsTrioComponent;
  let fixture: ComponentFixture<StatisticsTrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsTrioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsTrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
