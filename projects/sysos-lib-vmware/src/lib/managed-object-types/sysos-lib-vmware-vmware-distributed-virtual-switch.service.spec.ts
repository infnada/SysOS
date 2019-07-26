import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVmwareDistributedVirtualSwitchService } from './sysos-lib-vmware-vmware-distributed-virtual-switch.service';

describe('SysosLibVmwareVmwareDistributedVirtualSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVmwareDistributedVirtualSwitchService = TestBed.get(SysosLibVmwareVmwareDistributedVirtualSwitchService);
    expect(service).toBeTruthy();
  });
});
