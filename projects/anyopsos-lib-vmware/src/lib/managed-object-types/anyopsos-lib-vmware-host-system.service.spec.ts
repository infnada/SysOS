import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostSystemService } from './anyopsos-lib-vmware-host-system.service';

describe('AnyOpsOSLibVmwareHostSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostSystemService = TestBed.get(AnyOpsOSLibVmwareHostSystemService);
    expect(service).toBeTruthy();
  });
});
