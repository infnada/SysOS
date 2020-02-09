import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDockerHelpersService } from './anyopsos-lib-docker-helpers.service';

describe('AnyOpsOSLibDockerHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDockerHelpersService = TestBed.get(AnyOpsOSLibDockerHelpersService);
    expect(service).toBeTruthy();
  });
});
