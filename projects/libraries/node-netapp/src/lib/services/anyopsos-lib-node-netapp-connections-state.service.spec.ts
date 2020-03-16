import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeNetappConnectionsStateService } from './anyopsos-lib-node-netapp-connections-state.service';

describe('AnyOpsOSLibNodeNetappConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeNetappConnectionsStateService = TestBed.get(AnyOpsOSLibNodeNetappConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
