import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareGuestFileManagerService } from './anyopsos-lib-vmware-guest-file-manager.service';

describe('AnyOpsOSLibVmwareGuestFileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareGuestFileManagerService = TestBed.get(AnyOpsOSLibVmwareGuestFileManagerService);
    expect(service).toBeTruthy();
  });
});
