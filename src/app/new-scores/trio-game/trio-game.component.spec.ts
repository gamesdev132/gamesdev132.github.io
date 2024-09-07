import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrioGameComponent } from './trio-game.component';

describe('TrioGameComponent', () => {
  let component: TrioGameComponent;
  let fixture: ComponentFixture<TrioGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrioGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrioGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
