import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualMachineCompatibilityCheckerService } from './sysos-lib-vmware-virtual-machine-compatibility-checker.service';

describe('SysosLibVmwareVirtualMachineCompatibilityCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualMachineCompatibilityCheckerService = TestBed.get(SysosLibVmwareVirtualMachineCompatibilityCheckerService);
    expect(service).toBeTruthy();
  });
});
