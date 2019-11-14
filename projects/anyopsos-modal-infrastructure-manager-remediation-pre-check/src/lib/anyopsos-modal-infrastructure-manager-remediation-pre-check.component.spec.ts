import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent } from './anyopsos-modal-infrastructure-manager-remediation-pre-check.component';

describe('AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
