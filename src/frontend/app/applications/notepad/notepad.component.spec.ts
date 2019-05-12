import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadComponent } from './notepad.component';

describe('NotepadComponent', () => {
  let component: NotepadComponent;
  let fixture: ComponentFixture<NotepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
