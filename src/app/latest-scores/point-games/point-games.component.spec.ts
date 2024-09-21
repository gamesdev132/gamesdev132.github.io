import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointGamesComponent } from './point-games.component';

describe('PointGamesComponent', () => {
  let component: PointGamesComponent;
  let fixture: ComponentFixture<PointGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
