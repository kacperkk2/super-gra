import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopGameComponent } from './stop-game.component';

describe('StopGameComponent', () => {
  let component: StopGameComponent;
  let fixture: ComponentFixture<StopGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
