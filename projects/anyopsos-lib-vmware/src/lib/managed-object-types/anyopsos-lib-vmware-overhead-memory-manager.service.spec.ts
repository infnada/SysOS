import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareOverheadMemoryManagerService } from './anyopsos-lib-vmware-overhead-memory-manager.service';

describe('AnyOpsOSLibVmwareOverheadMemoryManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareOverheadMemoryManagerService = TestBed.get(AnyOpsOSLibVmwareOverheadMemoryManagerService);
    expect(service).toBeTruthy();
  });
});
