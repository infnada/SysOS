import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDistributedVirtualPortgroupService } from './sysos-lib-vmware-distributed-virtual-portgroup.service';

describe('SysosLibVmwareDistributedVirtualPortgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDistributedVirtualPortgroupService = TestBed.get(SysosLibVmwareDistributedVirtualPortgroupService);
    expect(service).toBeTruthy();
  });
});
