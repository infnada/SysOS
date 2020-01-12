import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareFailoverClusterManagerService } from './anyopsos-lib-vmware-failover-cluster-manager.service';

describe('AnyOpsOSLibVmwareFailoverClusterManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareFailoverClusterManagerService = TestBed.get(AnyOpsOSLibVmwareFailoverClusterManagerService);
    expect(service).toBeTruthy();
  });
});
