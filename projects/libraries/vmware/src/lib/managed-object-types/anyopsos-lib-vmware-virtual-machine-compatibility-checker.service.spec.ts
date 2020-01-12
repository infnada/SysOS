import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualMachineCompatibilityCheckerService } from './anyopsos-lib-vmware-virtual-machine-compatibility-checker.service';

describe('AnyOpsOSLibVmwareVirtualMachineCompatibilityCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualMachineCompatibilityCheckerService = TestBed.get(AnyOpsOSLibVmwareVirtualMachineCompatibilityCheckerService);
    expect(service).toBeTruthy();
  });
});
