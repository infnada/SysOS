import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareOpaqueNetworkService } from './anyopsos-lib-vmware-opaque-network.service';

describe('AnyOpsOSLibVmwareOpaqueNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareOpaqueNetworkService = TestBed.get(AnyOpsOSLibVmwareOpaqueNetworkService);
    expect(service).toBeTruthy();
  });
});
