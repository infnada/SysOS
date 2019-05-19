import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainEntryComponent } from './plain-entry.component';

describe('PlainEntryComponent', () => {
  let component: PlainEntryComponent;
  let fixture: ComponentFixture<PlainEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
