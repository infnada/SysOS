import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualMachineProvisioningCheckerService } from './anyopsos-lib-vmware-virtual-machine-provisioning-checker.service';

describe('AnyOpsOSLibVmwareVirtualMachineProvisioningCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualMachineProvisioningCheckerService = TestBed.get(AnyOpsOSLibVmwareVirtualMachineProvisioningCheckerService);
    expect(service).toBeTruthy();
  });
});
