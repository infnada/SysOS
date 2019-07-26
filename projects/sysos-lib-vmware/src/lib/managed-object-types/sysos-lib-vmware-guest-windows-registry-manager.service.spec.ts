import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareGuestWindowsRegistryManagerService } from './sysos-lib-vmware-guest-windows-registry-manager.service';

describe('SysosLibVmwareGuestWindowsRegistryManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareGuestWindowsRegistryManagerService = TestBed.get(SysosLibVmwareGuestWindowsRegistryManagerService);
    expect(service).toBeTruthy();
  });
});
