import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareIoFilterManagerService } from './anyopsos-lib-vmware-io-filter-manager.service';

describe('AnyOpsOSLibVmwareIoFilterManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareIoFilterManagerService = TestBed.get(AnyOpsOSLibVmwareIoFilterManagerService);
    expect(service).toBeTruthy();
  });
});
