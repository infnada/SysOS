import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappConnectionsStateService } from './anyopsos-lib-netapp-connections-state.service';

describe('AnyOpsOSLibNetappConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappConnectionsStateService = TestBed.get(AnyOpsOSLibNetappConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
