import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalQuestionComponent } from './sysos-modal-question.component';

describe('SysosModalQuestionComponent', () => {
  let component: SysosModalQuestionComponent;
  let fixture: ComponentFixture<SysosModalQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
