import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareIpPoolManagerService } from './anyopsos-lib-vmware-ip-pool-manager.service';

describe('AnyOpsOSLibVmwareIpPoolManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareIpPoolManagerService = TestBed.get(AnyOpsOSLibVmwareIpPoolManagerService);
    expect(service).toBeTruthy();
  });
});
