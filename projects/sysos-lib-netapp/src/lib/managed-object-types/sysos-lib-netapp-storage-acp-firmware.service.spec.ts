import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageAcpFirmwareService } from './sysos-lib-netapp-storage-acp-firmware.service';

describe('SysosLibNetappStorageAcpFirmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageAcpFirmwareService = TestBed.get(SysosLibNetappStorageAcpFirmwareService);
    expect(service).toBeTruthy();
  });
});
