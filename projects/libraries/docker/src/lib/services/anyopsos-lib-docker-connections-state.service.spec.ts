import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDockerConnectionsStateService } from './anyopsos-lib-docker-connections-state.service';

describe('AnyOpsOSLibDockerConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDockerConnectionsStateService = TestBed.get(AnyOpsOSLibDockerConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
