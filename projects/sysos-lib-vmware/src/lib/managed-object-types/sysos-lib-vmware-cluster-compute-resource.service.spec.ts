import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareClusterComputeResourceService } from './sysos-lib-vmware-cluster-compute-resource.service';

describe('SysosLibVmwareClusterComputeResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareClusterComputeResourceService = TestBed.get(SysosLibVmwareClusterComputeResourceService);
    expect(service).toBeTruthy();
  });
});
