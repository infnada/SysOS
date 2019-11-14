import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostHealthStatusSystemService } from './anyopsos-lib-vmware-host-health-status-system.service';

describe('AnyOpsOSLibVmwareHostHealthStatusSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostHealthStatusSystemService = TestBed.get(AnyOpsOSLibVmwareHostHealthStatusSystemService);
    expect(service).toBeTruthy();
  });
});
