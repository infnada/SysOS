import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibKubernetesService } from './anyopsos-lib-kubernetes.service';

describe('AnyOpsOSLibKubernetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibKubernetesService = TestBed.get(AnyOpsOSLibKubernetesService);
    expect(service).toBeTruthy();
  });
});
