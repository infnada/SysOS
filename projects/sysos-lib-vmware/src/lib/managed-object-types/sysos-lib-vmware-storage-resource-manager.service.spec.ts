import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareStorageResourceManagerService } from './sysos-lib-vmware-storage-resource-manager.service';

describe('SysosLibVmwareStorageResourceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareStorageResourceManagerService = TestBed.get(SysosLibVmwareStorageResourceManagerService);
    expect(service).toBeTruthy();
  });
});
