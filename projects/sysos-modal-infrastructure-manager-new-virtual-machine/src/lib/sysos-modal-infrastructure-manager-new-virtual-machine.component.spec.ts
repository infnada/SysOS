import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewVirtualMachineComponent } from './sysos-modal-infrastructure-manager-new-virtual-machine.component';

describe('SysosModalInfrastructureManagerNewVirtualMachineComponent', () => {
  let component: SysosModalInfrastructureManagerNewVirtualMachineComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewVirtualMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewVirtualMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewVirtualMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
