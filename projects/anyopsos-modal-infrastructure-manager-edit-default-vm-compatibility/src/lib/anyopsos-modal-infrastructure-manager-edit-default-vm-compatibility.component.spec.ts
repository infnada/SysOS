import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent } from './anyopsos-modal-infrastructure-manager-edit-default-vm-compatibility.component';

describe('AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
