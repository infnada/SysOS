import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostVmotionSystemService } from './anyopsos-lib-vmware-host-vmotion-system.service';

describe('AnyOpsOSLibVmwareHostVmotionSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostVmotionSystemService = TestBed.get(AnyOpsOSLibVmwareHostVmotionSystemService);
    expect(service).toBeTruthy();
  });
});
