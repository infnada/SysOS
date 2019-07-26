import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareGuestAuthManagerService } from './sysos-lib-vmware-guest-auth-manager.service';

describe('SysosLibVmwareGuestAuthManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareGuestAuthManagerService = TestBed.get(SysosLibVmwareGuestAuthManagerService);
    expect(service).toBeTruthy();
  });
});
