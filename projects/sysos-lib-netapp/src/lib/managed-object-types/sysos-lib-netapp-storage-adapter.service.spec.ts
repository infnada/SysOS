import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageAdapterService } from './sysos-lib-netapp-storage-adapter.service';

describe('SysosLibNetappStorageAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageAdapterService = TestBed.get(SysosLibNetappStorageAdapterService);
    expect(service).toBeTruthy();
  });
});
