import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostVsanSystemService } from './anyopsos-lib-vmware-host-vsan-system.service';

describe('AnyOpsOSLibVmwareHostVsanSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostVsanSystemService = TestBed.get(AnyOpsOSLibVmwareHostVsanSystemService);
    expect(service).toBeTruthy();
  });
});
