import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureDockerService } from './anyopsos-app-infrastructure-docker.service';

describe('AnyOpsOSAppInfrastructureDockerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureDockerService = TestBed.get(AnyOpsOSAppInfrastructureDockerService);
    expect(service).toBeTruthy();
  });
});
