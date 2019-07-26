import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareClusterProfileService } from './sysos-lib-vmware-cluster-profile.service';

describe('SysosLibVmwareClusterProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareClusterProfileService = TestBed.get(SysosLibVmwareClusterProfileService);
    expect(service).toBeTruthy();
  });
});
