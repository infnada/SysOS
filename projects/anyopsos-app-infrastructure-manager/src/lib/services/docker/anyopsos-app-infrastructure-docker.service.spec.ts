import { TestBed } from '@angular/core/testing';

import { AnyopsosAppInfrastructureDockerService } from './anyopsos-app-infrastructure-docker.service';

describe('AnyopsosAppInfrastructureDockerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyopsosAppInfrastructureDockerService = TestBed.get(AnyopsosAppInfrastructureDockerService);
    expect(service).toBeTruthy();
  });
});
