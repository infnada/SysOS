import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeDockerApiService } from './anyopsos-lib-node-docker-api.service';

describe('AnyOpsOSLibNodeDockerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeDockerApiService = TestBed.get(AnyOpsOSLibNodeDockerApiService);
    expect(service).toBeTruthy();
  });
});
