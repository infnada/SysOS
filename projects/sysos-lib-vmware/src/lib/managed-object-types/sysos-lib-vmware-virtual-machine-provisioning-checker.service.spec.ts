import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualMachineProvisioningCheckerService } from './sysos-lib-vmware-virtual-machine-provisioning-checker.service';

describe('SysosLibVmwareVirtualMachineProvisioningCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualMachineProvisioningCheckerService = TestBed.get(SysosLibVmwareVirtualMachineProvisioningCheckerService);
    expect(service).toBeTruthy();
  });
});
