import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwarePerformanceManagerService } from './anyopsos-lib-vmware-performance-manager.service';

describe('AnyOpsOSLibVmwarePerformanceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwarePerformanceManagerService = TestBed.get(AnyOpsOSLibVmwarePerformanceManagerService);
    expect(service).toBeTruthy();
  });
});
