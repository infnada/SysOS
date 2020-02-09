import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareConnectionsStateService } from './anyopsos-lib-vmware-connections-state.service';

describe('AnyOpsOSLibVmwareConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareConnectionsStateService = TestBed.get(AnyOpsOSLibVmwareConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
