import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareResourcePoolService } from './anyopsos-lib-vmware-resource-pool.service';

describe('AnyOpsOSLibVmwareResourcePoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareResourcePoolService = TestBed.get(AnyOpsOSLibVmwareResourcePoolService);
    expect(service).toBeTruthy();
  });
});
