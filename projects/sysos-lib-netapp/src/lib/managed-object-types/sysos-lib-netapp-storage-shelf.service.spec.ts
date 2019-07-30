import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageShelfService } from './sysos-lib-netapp-storage-shelf.service';

describe('SysosLibNetappStorageShelfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageShelfService = TestBed.get(SysosLibNetappStorageShelfService);
    expect(service).toBeTruthy();
  });
});
