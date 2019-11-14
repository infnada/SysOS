import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent } from './anyopsos-modal-infrastructure-manager-new-virtual-machine.component';

describe('AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
