import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibKubernetesApiService } from './anyopsos-lib-kubernetes-api.service';

describe('AnyOpsOSLibKubernetesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibKubernetesApiService = TestBed.get(AnyOpsOSLibKubernetesApiService);
    expect(service).toBeTruthy();
  });
});
