import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibKubernetesConnectionsStateService } from './anyopsos-lib-kubernetes-connections-state.service';

describe('AnyOpsOSLibKubernetesConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibKubernetesConnectionsStateService = TestBed.get(AnyOpsOSLibKubernetesConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
