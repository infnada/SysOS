import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostNetworkSystemService } from './anyopsos-lib-vmware-host-network-system.service';

describe('AnyOpsOSLibVmwareHostNetworkSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostNetworkSystemService = TestBed.get(AnyOpsOSLibVmwareHostNetworkSystemService);
    expect(service).toBeTruthy();
  });
});
