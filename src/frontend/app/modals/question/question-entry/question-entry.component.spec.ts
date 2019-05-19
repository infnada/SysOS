import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEntryComponent } from './question-entry.component';

describe('QuestionEntryComponent', () => {
  let component: QuestionEntryComponent;
  let fixture: ComponentFixture<QuestionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
