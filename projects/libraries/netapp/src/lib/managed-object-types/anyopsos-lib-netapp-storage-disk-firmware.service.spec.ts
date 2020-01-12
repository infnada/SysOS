import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageDiskFirmwareService } from './anyopsos-lib-netapp-storage-disk-firmware.service';

describe('AnyOpsOSLibNetappStorageDiskFirmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageDiskFirmwareService = TestBed.get(AnyOpsOSLibNetappStorageDiskFirmwareService);
    expect(service).toBeTruthy();
  });
});
