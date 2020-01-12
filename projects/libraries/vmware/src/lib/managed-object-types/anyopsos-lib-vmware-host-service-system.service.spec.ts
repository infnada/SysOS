import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostServiceSystemService } from './anyopsos-lib-vmware-host-service-system.service';

describe('AnyOpsOSLibVmwareHostServiceSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostServiceSystemService = TestBed.get(AnyOpsOSLibVmwareHostServiceSystemService);
    expect(service).toBeTruthy();
  });
});
