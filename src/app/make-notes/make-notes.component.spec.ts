import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNotesComponent } from './make-notes.component';

describe('MakeNotesComponent', () => {
  let component: MakeNotesComponent;
  let fixture: ComponentFixture<MakeNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
