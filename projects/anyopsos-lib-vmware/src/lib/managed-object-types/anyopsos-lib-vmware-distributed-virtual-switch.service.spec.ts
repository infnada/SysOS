import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDistributedVirtualSwitchService } from './anyopsos-lib-vmware-distributed-virtual-switch.service';

describe('AnyOpsOSLibVmwareDistributedVirtualSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDistributedVirtualSwitchService = TestBed.get(AnyOpsOSLibVmwareDistributedVirtualSwitchService);
    expect(service).toBeTruthy();
  });
});
