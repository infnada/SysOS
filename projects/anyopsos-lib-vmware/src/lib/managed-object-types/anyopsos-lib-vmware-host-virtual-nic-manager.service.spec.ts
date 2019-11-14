import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostVirtualNicManagerService } from './anyopsos-lib-vmware-host-virtual-nic-manager.service';

describe('AnyOpsOSLibVmwareHostVirtualNicManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostVirtualNicManagerService = TestBed.get(AnyOpsOSLibVmwareHostVirtualNicManagerService);
    expect(service).toBeTruthy();
  });
});
