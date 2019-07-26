import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostFirmwareSystemService } from './sysos-lib-vmware-host-firmware-system.service';

describe('SysosLibVmwareHostFirmwareSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostFirmwareSystemService = TestBed.get(SysosLibVmwareHostFirmwareSystemService);
    expect(service).toBeTruthy();
  });
});
