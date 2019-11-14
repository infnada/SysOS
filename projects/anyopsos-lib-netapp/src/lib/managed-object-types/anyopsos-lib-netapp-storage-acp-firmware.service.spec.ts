import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageAcpFirmwareService } from './anyopsos-lib-netapp-storage-acp-firmware.service';

describe('AnyOpsOSLibNetappStorageAcpFirmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageAcpFirmwareService = TestBed.get(AnyOpsOSLibNetappStorageAcpFirmwareService);
    expect(service).toBeTruthy();
  });
});
