import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeLinuxConnectionsStateService } from './anyopsos-lib-node-linux-connections-state.service';

describe('AnyOpsOSLibNodeLinuxConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeLinuxConnectionsStateService = TestBed.get(AnyOpsOSLibNodeLinuxConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
