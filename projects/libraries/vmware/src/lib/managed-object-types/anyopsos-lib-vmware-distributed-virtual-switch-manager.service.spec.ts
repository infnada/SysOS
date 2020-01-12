import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDistributedVirtualSwitchManagerService } from './anyopsos-lib-vmware-distributed-virtual-switch-manager.service';

describe('AnyOpsOSLibVmwareDistributedVirtualSwitchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDistributedVirtualSwitchManagerService = TestBed.get(AnyOpsOSLibVmwareDistributedVirtualSwitchManagerService);
    expect(service).toBeTruthy();
  });
});
