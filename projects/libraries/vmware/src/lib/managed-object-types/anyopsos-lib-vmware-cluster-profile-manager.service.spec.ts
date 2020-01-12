import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareClusterProfileManagerService } from './anyopsos-lib-vmware-cluster-profile-manager.service';

describe('AnyOpsOSLibVmwareClusterProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareClusterProfileManagerService = TestBed.get(AnyOpsOSLibVmwareClusterProfileManagerService);
    expect(service).toBeTruthy();
  });
});
