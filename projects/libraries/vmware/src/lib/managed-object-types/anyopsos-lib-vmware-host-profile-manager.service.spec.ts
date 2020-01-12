import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostProfileManagerService } from './anyopsos-lib-vmware-host-profile-manager.service';

describe('AnyOpsOSLibVmwareHostProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostProfileManagerService = TestBed.get(AnyOpsOSLibVmwareHostProfileManagerService);
    expect(service).toBeTruthy();
  });
});
