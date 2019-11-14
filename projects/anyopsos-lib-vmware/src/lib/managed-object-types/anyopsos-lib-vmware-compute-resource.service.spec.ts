import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareComputeResourceService } from './anyopsos-lib-vmware-compute-resource.service';

describe('AnyOpsOSLibVmwareComputeResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareComputeResourceService = TestBed.get(AnyOpsOSLibVmwareComputeResourceService);
    expect(service).toBeTruthy();
  });
});
