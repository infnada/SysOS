import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStoragePoolService } from './sysos-lib-netapp-storage-pool.service';

describe('SysosLibNetappStoragePoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStoragePoolService = TestBed.get(SysosLibNetappStoragePoolService);
    expect(service).toBeTruthy();
  });
});
