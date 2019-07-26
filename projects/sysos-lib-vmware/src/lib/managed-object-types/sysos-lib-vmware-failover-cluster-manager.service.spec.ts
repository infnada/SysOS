import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareFailoverClusterManagerService } from './sysos-lib-vmware-failover-cluster-manager.service';

describe('SysosLibVmwareFailoverClusterManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareFailoverClusterManagerService = TestBed.get(SysosLibVmwareFailoverClusterManagerService);
    expect(service).toBeTruthy();
  });
});
