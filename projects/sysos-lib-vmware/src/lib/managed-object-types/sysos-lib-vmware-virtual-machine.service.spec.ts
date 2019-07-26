import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualMachineService } from './sysos-lib-vmware-virtual-machine.service';

describe('SysosLibVmwareVirtualMachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualMachineService = TestBed.get(SysosLibVmwareVirtualMachineService);
    expect(service).toBeTruthy();
  });
});
