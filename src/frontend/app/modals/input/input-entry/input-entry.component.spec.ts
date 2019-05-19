import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEntryComponent } from './input-entry.component';

describe('InputEntryComponent', () => {
  let component: InputEntryComponent;
  let fixture: ComponentFixture<InputEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
