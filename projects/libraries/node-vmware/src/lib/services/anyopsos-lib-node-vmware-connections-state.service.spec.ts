import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeVmwareConnectionsStateService } from './anyopsos-lib-node-vmware-connections-state.service';

describe('AnyOpsOSLibNodeVmwareConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeVmwareConnectionsStateService = TestBed.get(AnyOpsOSLibNodeVmwareConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
