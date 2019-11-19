import { TestBed } from '@angular/core/testing';

import { AnyopsosAppInfrastructureKubernetesService } from './anyopsos-app-infrastructure-kubernetes.service';

describe('AnyopsosAppInfrastructureKubernetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyopsosAppInfrastructureKubernetesService = TestBed.get(AnyopsosAppInfrastructureKubernetesService);
    expect(service).toBeTruthy();
  });
});
