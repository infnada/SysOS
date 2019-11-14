import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFlashDeviceService } from './anyopsos-lib-netapp-flash-device.service';

describe('AnyOpsOSLibNetappFlashDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFlashDeviceService = TestBed.get(AnyOpsOSLibNetappFlashDeviceService);
    expect(service).toBeTruthy();
  });
});
