import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadMenuComponent } from './notepad-menu.component';

describe('NotepadMenuComponent', () => {
  let component: NotepadMenuComponent;
  let fixture: ComponentFixture<NotepadMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotepadMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
