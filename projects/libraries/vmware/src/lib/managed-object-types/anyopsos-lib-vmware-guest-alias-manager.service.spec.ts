import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareGuestAliasManagerService } from './anyopsos-lib-vmware-guest-alias-manager.service';

describe('AnyOpsOSLibVmwareGuestAliasManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareGuestAliasManagerService = TestBed.get(AnyOpsOSLibVmwareGuestAliasManagerService);
    expect(service).toBeTruthy();
  });
});
