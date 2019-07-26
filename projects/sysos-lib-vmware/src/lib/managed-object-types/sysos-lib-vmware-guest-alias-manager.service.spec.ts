import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareGuestAliasManagerService } from './sysos-lib-vmware-guest-alias-manager.service';

describe('SysosLibVmwareGuestAliasManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareGuestAliasManagerService = TestBed.get(SysosLibVmwareGuestAliasManagerService);
    expect(service).toBeTruthy();
  });
});
