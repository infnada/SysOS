import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageArrayService } from './sysos-lib-netapp-storage-array.service';

describe('SysosLibNetappStorageArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageArrayService = TestBed.get(SysosLibNetappStorageArrayService);
    expect(service).toBeTruthy();
  });
});
