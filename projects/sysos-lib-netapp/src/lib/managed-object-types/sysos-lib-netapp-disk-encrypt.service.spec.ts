import { TestBed } from '@angular/core/testing';

import { SysosLibNetappDiskEncryptService } from './sysos-lib-netapp-disk-encrypt.service';

describe('SysosLibNetappDiskEncryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappDiskEncryptService = TestBed.get(SysosLibNetappDiskEncryptService);
    expect(service).toBeTruthy();
  });
});
