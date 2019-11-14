import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareGuestOperationsManagerService } from './anyopsos-lib-vmware-guest-operations-manager.service';

describe('AnyOpsOSLibVmwareGuestOperationsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareGuestOperationsManagerService = TestBed.get(AnyOpsOSLibVmwareGuestOperationsManagerService);
    expect(service).toBeTruthy();
  });
});
