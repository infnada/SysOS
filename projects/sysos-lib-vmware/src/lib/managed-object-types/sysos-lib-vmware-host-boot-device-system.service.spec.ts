import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostBootDeviceSystemService } from './sysos-lib-vmware-host-boot-device-system.service';

describe('SysosLibVmwareHostBootDeviceSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostBootDeviceSystemService = TestBed.get(SysosLibVmwareHostBootDeviceSystemService);
    expect(service).toBeTruthy();
  });
});
