import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDockerApiService } from './anyopsos-lib-docker-api.service';

describe('AnyOpsOSLibDockerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDockerApiService = TestBed.get(AnyOpsOSLibDockerApiService);
    expect(service).toBeTruthy();
  });
});
