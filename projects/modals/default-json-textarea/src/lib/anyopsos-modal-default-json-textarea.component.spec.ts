import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalDefaultJsonTextareaComponent } from './anyopsos-modal-default-json-textarea.component';

describe('AnyOpsOSModalDefaultJsonTextareaComponent', () => {
  let component: AnyOpsOSModalDefaultJsonTextareaComponent;
  let fixture: ComponentFixture<AnyOpsOSModalDefaultJsonTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalDefaultJsonTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalDefaultJsonTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
