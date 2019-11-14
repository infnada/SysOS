import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalQuestionComponent } from './anyopsos-modal-question.component';

describe('AnyOpsOSModalQuestionComponent', () => {
  let component: AnyOpsOSModalQuestionComponent;
  let fixture: ComponentFixture<AnyOpsOSModalQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
