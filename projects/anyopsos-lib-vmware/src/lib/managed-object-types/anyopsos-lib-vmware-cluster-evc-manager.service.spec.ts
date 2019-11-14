import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareClusterEvcManagerService } from './anyopsos-lib-vmware-cluster-evc-manager.service';

describe('AnyOpsOSLibVmwareClusterEvcManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareClusterEvcManagerService = TestBed.get(AnyOpsOSLibVmwareClusterEvcManagerService);
    expect(service).toBeTruthy();
  });
});
