import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareVirtualMachineComponent } from './body-vmware-virtual-machine.component';

describe('BodyVmwareVirtualMachineComponent', () => {
  let component: BodyVmwareVirtualMachineComponent;
  let fixture: ComponentFixture<BodyVmwareVirtualMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareVirtualMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareVirtualMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
