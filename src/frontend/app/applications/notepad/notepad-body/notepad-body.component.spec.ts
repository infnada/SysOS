import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadBodyComponent } from './notepad-body.component';

describe('NotepadBodyComponent', () => {
  let component: NotepadBodyComponent;
  let fixture: ComponentFixture<NotepadBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotepadBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
