import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareGuestAuthManagerService } from './anyopsos-lib-vmware-guest-auth-manager.service';

describe('AnyOpsOSLibVmwareGuestAuthManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareGuestAuthManagerService = TestBed.get(AnyOpsOSLibVmwareGuestAuthManagerService);
    expect(service).toBeTruthy();
  });
});
