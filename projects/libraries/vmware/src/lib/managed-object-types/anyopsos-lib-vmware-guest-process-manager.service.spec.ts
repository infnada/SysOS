import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareGuestProcessManagerService } from './anyopsos-lib-vmware-guest-process-manager.service';

describe('AnyOpsOSLibVmwareGuestProcessManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareGuestProcessManagerService = TestBed.get(AnyOpsOSLibVmwareGuestProcessManagerService);
    expect(service).toBeTruthy();
  });
});
