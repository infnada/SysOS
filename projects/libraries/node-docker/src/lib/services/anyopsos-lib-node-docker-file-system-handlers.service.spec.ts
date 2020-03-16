import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeDockerFileSystemHandlersService } from './anyopsos-lib-node-docker-file-system-handlers.service';

describe('AnyOpsOSLibNodeDockerFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeDockerFileSystemHandlersService = TestBed.get(AnyOpsOSLibNodeDockerFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
