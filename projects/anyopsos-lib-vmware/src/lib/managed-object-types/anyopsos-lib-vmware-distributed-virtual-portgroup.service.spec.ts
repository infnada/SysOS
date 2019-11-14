import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDistributedVirtualPortgroupService } from './anyopsos-lib-vmware-distributed-virtual-portgroup.service';

describe('AnyOpsOSLibVmwareDistributedVirtualPortgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDistributedVirtualPortgroupService = TestBed.get(AnyOpsOSLibVmwareDistributedVirtualPortgroupService);
    expect(service).toBeTruthy();
  });
});
