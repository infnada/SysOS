import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStoragePortService } from './sysos-lib-netapp-storage-port.service';

describe('SysosLibNetappStoragePortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStoragePortService = TestBed.get(SysosLibNetappStoragePortService);
    expect(service).toBeTruthy();
  });
});
