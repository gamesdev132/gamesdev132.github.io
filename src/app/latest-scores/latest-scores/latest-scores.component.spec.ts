import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestScoresComponent } from './latest-scores.component';

describe('LatestScoresComponent', () => {
  let component: LatestScoresComponent;
  let fixture: ComponentFixture<LatestScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestScoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
