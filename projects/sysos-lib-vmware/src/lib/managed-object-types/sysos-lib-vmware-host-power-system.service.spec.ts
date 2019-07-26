import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostPowerSystemService } from './sysos-lib-vmware-host-power-system.service';

describe('SysosLibVmwareHostPowerSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostPowerSystemService = TestBed.get(SysosLibVmwareHostPowerSystemService);
    expect(service).toBeTruthy();
  });
});
