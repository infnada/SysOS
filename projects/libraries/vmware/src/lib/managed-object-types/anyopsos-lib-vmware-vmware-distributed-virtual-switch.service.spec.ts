import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVmwareDistributedVirtualSwitchService } from './anyopsos-lib-vmware-vmware-distributed-virtual-switch.service';

describe('AnyOpsOSLibVmwareVmwareDistributedVirtualSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVmwareDistributedVirtualSwitchService = TestBed.get(AnyOpsOSLibVmwareVmwareDistributedVirtualSwitchService);
    expect(service).toBeTruthy();
  });
});
