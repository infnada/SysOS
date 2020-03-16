import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeDockerConnectionsStateService } from './anyopsos-lib-node-docker-connections-state.service';

describe('AnyOpsOSLibNodeDockerConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeDockerConnectionsStateService = TestBed.get(AnyOpsOSLibNodeDockerConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
