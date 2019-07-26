import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareComputeResourceService } from './sysos-lib-vmware-compute-resource.service';

describe('SysosLibVmwareComputeResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareComputeResourceService = TestBed.get(SysosLibVmwareComputeResourceService);
    expect(service).toBeTruthy();
  });
});
