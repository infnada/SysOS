import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareClusterEvcManagerService } from './sysos-lib-vmware-cluster-evc-manager.service';

describe('SysosLibVmwareClusterEvcManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareClusterEvcManagerService = TestBed.get(SysosLibVmwareClusterEvcManagerService);
    expect(service).toBeTruthy();
  });
});
