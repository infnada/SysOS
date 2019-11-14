import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageShelfFirmwareService } from './anyopsos-lib-netapp-storage-shelf-firmware.service';

describe('AnyOpsOSLibNetappStorageShelfFirmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageShelfFirmwareService = TestBed.get(AnyOpsOSLibNetappStorageShelfFirmwareService);
    expect(service).toBeTruthy();
  });
});
