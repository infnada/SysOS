import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDockerService } from './anyopsos-lib-docker.service';

describe('AnyOpsOSLibDockerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDockerService = TestBed.get(AnyOpsOSLibDockerService);
    expect(service).toBeTruthy();
  });
});
