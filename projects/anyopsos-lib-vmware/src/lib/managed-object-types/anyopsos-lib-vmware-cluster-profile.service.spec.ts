import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareClusterProfileService } from './anyopsos-lib-vmware-cluster-profile.service';

describe('AnyOpsOSLibVmwareClusterProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareClusterProfileService = TestBed.get(AnyOpsOSLibVmwareClusterProfileService);
    expect(service).toBeTruthy();
  });
});
