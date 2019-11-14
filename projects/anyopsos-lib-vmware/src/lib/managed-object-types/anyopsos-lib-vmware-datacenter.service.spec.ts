import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDatacenterService } from './anyopsos-lib-vmware-datacenter.service';

describe('AnyOpsOSLibVmwareDatacenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDatacenterService = TestBed.get(AnyOpsOSLibVmwareDatacenterService);
    expect(service).toBeTruthy();
  });
});
