import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageDiskService } from './sysos-lib-netapp-storage-disk.service';

describe('SysosLibNetappStorageDiskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageDiskService = TestBed.get(SysosLibNetappStorageDiskService);
    expect(service).toBeTruthy();
  });
});
