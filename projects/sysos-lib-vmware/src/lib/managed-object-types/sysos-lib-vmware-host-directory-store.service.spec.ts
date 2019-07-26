import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostDirectoryStoreService } from './sysos-lib-vmware-host-directory-store.service';

describe('SysosLibVmwareHostDirectoryStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostDirectoryStoreService = TestBed.get(SysosLibVmwareHostDirectoryStoreService);
    expect(service).toBeTruthy();
  });
});
