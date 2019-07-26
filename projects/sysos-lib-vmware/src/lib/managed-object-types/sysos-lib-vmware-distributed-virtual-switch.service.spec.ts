import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDistributedVirtualSwitchService } from './sysos-lib-vmware-distributed-virtual-switch.service';

describe('SysosLibVmwareDistributedVirtualSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDistributedVirtualSwitchService = TestBed.get(SysosLibVmwareDistributedVirtualSwitchService);
    expect(service).toBeTruthy();
  });
});
