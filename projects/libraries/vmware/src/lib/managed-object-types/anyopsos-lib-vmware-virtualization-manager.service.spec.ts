import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualizationManagerService } from './anyopsos-lib-vmware-virtualization-manager.service';

describe('AnyOpsOSLibVmwareVirtualizationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualizationManagerService = TestBed.get(AnyOpsOSLibVmwareVirtualizationManagerService);
    expect(service).toBeTruthy();
  });
});
