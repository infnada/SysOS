import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostVsanInternalSystemService } from './anyopsos-lib-vmware-host-vsan-internal-system.service';

describe('AnyOpsOSLibVmwareHostVsanInternalSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostVsanInternalSystemService = TestBed.get(AnyOpsOSLibVmwareHostVsanInternalSystemService);
    expect(service).toBeTruthy();
  });
});
