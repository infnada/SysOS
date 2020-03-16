import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeDockerHelpersService } from './anyopsos-lib-node-docker-helpers.service';

describe('AnyOpsOSLibNodeDockerHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeDockerHelpersService = TestBed.get(AnyOpsOSLibNodeDockerHelpersService);
    expect(service).toBeTruthy();
  });
});
