import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostBootDeviceSystemService } from './anyopsos-lib-vmware-host-boot-device-system.service';

describe('AnyOpsOSLibVmwareHostBootDeviceSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostBootDeviceSystemService = TestBed.get(AnyOpsOSLibVmwareHostBootDeviceSystemService);
    expect(service).toBeTruthy();
  });
});
