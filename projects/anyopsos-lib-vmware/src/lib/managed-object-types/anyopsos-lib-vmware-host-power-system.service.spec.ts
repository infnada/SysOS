import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostPowerSystemService } from './anyopsos-lib-vmware-host-power-system.service';

describe('AnyOpsOSLibVmwareHostPowerSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostPowerSystemService = TestBed.get(AnyOpsOSLibVmwareHostPowerSystemService);
    expect(service).toBeTruthy();
  });
});
