import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageDiskFirmwareService } from './sysos-lib-netapp-storage-disk-firmware.service';

describe('SysosLibNetappStorageDiskFirmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageDiskFirmwareService = TestBed.get(SysosLibNetappStorageDiskFirmwareService);
    expect(service).toBeTruthy();
  });
});
