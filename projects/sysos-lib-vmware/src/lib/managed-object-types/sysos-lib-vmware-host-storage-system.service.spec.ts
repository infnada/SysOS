import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostStorageSystemService } from './sysos-lib-vmware-host-storage-system.service';

describe('SysosLibVmwareHostStorageSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostStorageSystemService = TestBed.get(SysosLibVmwareHostStorageSystemService);
    expect(service).toBeTruthy();
  });
});
