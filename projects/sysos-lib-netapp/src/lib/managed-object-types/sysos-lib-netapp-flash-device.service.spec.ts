import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFlashDeviceService } from './sysos-lib-netapp-flash-device.service';

describe('SysosLibNetappFlashDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFlashDeviceService = TestBed.get(SysosLibNetappFlashDeviceService);
    expect(service).toBeTruthy();
  });
});
