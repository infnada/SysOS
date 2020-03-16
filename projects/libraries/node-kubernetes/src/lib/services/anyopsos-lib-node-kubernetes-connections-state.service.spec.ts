import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeKubernetesConnectionsStateService } from './anyopsos-lib-node-kubernetes-connections-state.service';

describe('AnyOpsOSLibNodeKubernetesConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeKubernetesConnectionsStateService = TestBed.get(AnyOpsOSLibNodeKubernetesConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
