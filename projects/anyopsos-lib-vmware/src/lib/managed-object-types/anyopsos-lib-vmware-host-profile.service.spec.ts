import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostProfileService } from './anyopsos-lib-vmware-host-profile.service';

describe('AnyOpsOSLibVmwareHostProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostProfileService = TestBed.get(AnyOpsOSLibVmwareHostProfileService);
    expect(service).toBeTruthy();
  });
});
