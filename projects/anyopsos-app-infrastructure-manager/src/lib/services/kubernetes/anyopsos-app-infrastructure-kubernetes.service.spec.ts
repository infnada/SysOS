import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureKubernetesService } from './anyopsos-app-infrastructure-kubernetes.service';

describe('AnyOpsOSAppInfrastructureKubernetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureKubernetesService = TestBed.get(AnyOpsOSAppInfrastructureKubernetesService);
    expect(service).toBeTruthy();
  });
});
