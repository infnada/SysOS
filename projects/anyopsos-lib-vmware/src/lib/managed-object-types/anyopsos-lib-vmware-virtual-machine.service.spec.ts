import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualMachineService } from './anyopsos-lib-vmware-virtual-machine.service';

describe('AnyOpsOSLibVmwareVirtualMachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualMachineService = TestBed.get(AnyOpsOSLibVmwareVirtualMachineService);
    expect(service).toBeTruthy();
  });
});
