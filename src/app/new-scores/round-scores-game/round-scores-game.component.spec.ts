import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundScoresGameComponent } from './round-scores-game.component';

describe('RoundScoresGameComponent', () => {
  let component: RoundScoresGameComponent;
  let fixture: ComponentFixture<RoundScoresGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundScoresGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundScoresGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
