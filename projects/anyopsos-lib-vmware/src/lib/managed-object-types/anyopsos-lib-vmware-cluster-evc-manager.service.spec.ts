import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareClusterEVCManagerService } from './anyopsos-lib-vmware-cluster-evc-manager.service';

describe('AnyOpsOSLibVmwareClusterEvcManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareClusterEVCManagerService = TestBed.get(AnyOpsOSLibVmwareClusterEVCManagerService);
    expect(service).toBeTruthy();
  });
});
