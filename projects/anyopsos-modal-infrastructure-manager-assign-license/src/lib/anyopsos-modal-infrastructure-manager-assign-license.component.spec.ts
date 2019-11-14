import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerAssignLicenseComponent } from './anyopsos-modal-infrastructure-manager-assign-license.component';

describe('AnyOpsOSModalInfrastructureManagerAssignLicenseComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerAssignLicenseComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerAssignLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerAssignLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerAssignLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
