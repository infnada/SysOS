import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareFailoverClusterConfiguratorService } from './sysos-lib-vmware-failover-cluster-configurator.service';

describe('SysosLibVmwareFailoverClusterConfiguratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareFailoverClusterConfiguratorService = TestBed.get(SysosLibVmwareFailoverClusterConfiguratorService);
    expect(service).toBeTruthy();
  });
});
