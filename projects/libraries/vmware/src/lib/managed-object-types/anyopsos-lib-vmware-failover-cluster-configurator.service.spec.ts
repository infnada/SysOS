import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareFailoverClusterConfiguratorService } from './anyopsos-lib-vmware-failover-cluster-configurator.service';

describe('AnyOpsOSLibVmwareFailoverClusterConfiguratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareFailoverClusterConfiguratorService = TestBed.get(AnyOpsOSLibVmwareFailoverClusterConfiguratorService);
    expect(service).toBeTruthy();
  });
});
