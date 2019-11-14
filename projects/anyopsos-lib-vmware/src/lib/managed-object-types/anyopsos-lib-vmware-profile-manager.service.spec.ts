import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareProfileManagerService } from './anyopsos-lib-vmware-profile-manager.service';

describe('AnyOpsOSLibVmwareProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareProfileManagerService = TestBed.get(AnyOpsOSLibVmwareProfileManagerService);
    expect(service).toBeTruthy();
  });
});
