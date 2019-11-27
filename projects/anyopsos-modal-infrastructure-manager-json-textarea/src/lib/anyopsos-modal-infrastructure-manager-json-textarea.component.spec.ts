import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerJsonTextareaComponent } from './anyopsos-modal-infrastructure-manager-json-textarea.component';

describe('AnyOpsOSModalInfrastructureManagerJsonTextareaComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerJsonTextareaComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerJsonTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerJsonTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerJsonTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
