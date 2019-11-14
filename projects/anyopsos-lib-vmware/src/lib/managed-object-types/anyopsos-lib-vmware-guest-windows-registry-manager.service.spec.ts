import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareGuestWindowsRegistryManagerService } from './anyopsos-lib-vmware-guest-windows-registry-manager.service';

describe('AnyOpsOSLibVmwareGuestWindowsRegistryManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareGuestWindowsRegistryManagerService = TestBed.get(AnyOpsOSLibVmwareGuestWindowsRegistryManagerService);
    expect(service).toBeTruthy();
  });
});
