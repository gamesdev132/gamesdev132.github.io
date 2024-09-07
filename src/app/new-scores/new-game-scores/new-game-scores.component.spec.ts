import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameScoresComponent } from './new-game-scores.component';

describe('NewGameScoresComponent', () => {
  let component: NewGameScoresComponent;
  let fixture: ComponentFixture<NewGameScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameScoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
