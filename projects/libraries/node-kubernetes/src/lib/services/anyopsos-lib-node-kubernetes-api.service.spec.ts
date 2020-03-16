import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeKubernetesApiService } from './anyopsos-lib-node-kubernetes-api.service';

describe('AnyOpsOSLibNodeKubernetesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeKubernetesApiService = TestBed.get(AnyOpsOSLibNodeKubernetesApiService);
    expect(service).toBeTruthy();
  });
});
