import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageShelfFirmwareService } from './sysos-lib-netapp-storage-shelf-firmware.service';

describe('SysosLibNetappStorageShelfFirmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageShelfFirmwareService = TestBed.get(SysosLibNetappStorageShelfFirmwareService);
    expect(service).toBeTruthy();
  });
});
