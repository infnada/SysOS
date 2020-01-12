import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareProfileService } from './anyopsos-lib-vmware-profile.service';

describe('AnyOpsOSLibVmwareProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareProfileService = TestBed.get(AnyOpsOSLibVmwareProfileService);
    expect(service).toBeTruthy();
  });
});
