import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDistributedVirtualSwitchManagerService } from './sysos-lib-vmware-distributed-virtual-switch-manager.service';

describe('SysosLibVmwareDistributedVirtualSwitchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDistributedVirtualSwitchManagerService = TestBed.get(SysosLibVmwareDistributedVirtualSwitchManagerService);
    expect(service).toBeTruthy();
  });
});
