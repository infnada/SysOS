import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareGuestFileManagerService } from './sysos-lib-vmware-guest-file-manager.service';

describe('SysosLibVmwareGuestFileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareGuestFileManagerService = TestBed.get(SysosLibVmwareGuestFileManagerService);
    expect(service).toBeTruthy();
  });
});
