import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalDefaultQuestionComponent } from './anyopsos-modal-default-question.component';

describe('AnyOpsOSModalDefaultQuestionComponent', () => {
  let component: AnyOpsOSModalDefaultQuestionComponent;
  let fixture: ComponentFixture<AnyOpsOSModalDefaultQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalDefaultQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalDefaultQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
