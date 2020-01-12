import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareNetworkService } from './anyopsos-lib-vmware-network.service';

describe('AnyOpsOSLibVmwareNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareNetworkService = TestBed.get(AnyOpsOSLibVmwareNetworkService);
    expect(service).toBeTruthy();
  });
});
