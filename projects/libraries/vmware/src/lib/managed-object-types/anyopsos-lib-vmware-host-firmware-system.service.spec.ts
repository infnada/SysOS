import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostFirmwareSystemService } from './anyopsos-lib-vmware-host-firmware-system.service';

describe('AnyOpsOSLibVmwareHostFirmwareSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostFirmwareSystemService = TestBed.get(AnyOpsOSLibVmwareHostFirmwareSystemService);
    expect(service).toBeTruthy();
  });
});
