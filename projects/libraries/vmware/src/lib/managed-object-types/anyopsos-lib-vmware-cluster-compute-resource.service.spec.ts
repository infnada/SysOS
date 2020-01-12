import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareClusterComputeResourceService } from './anyopsos-lib-vmware-cluster-compute-resource.service';

describe('AnyOpsOSLibVmwareClusterComputeResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareClusterComputeResourceService = TestBed.get(AnyOpsOSLibVmwareClusterComputeResourceService);
    expect(service).toBeTruthy();
  });
});
