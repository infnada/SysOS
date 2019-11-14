import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualDiskManagerService } from './anyopsos-lib-vmware-virtual-disk-manager.service';

describe('AnyOpsOSLibVmwareVirtualDiskManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualDiskManagerService = TestBed.get(AnyOpsOSLibVmwareVirtualDiskManagerService);
    expect(service).toBeTruthy();
  });
});
