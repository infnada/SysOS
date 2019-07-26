import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareClusterProfileManagerService } from './sysos-lib-vmware-cluster-profile-manager.service';

describe('SysosLibVmwareClusterProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareClusterProfileManagerService = TestBed.get(SysosLibVmwareClusterProfileManagerService);
    expect(service).toBeTruthy();
  });
});
