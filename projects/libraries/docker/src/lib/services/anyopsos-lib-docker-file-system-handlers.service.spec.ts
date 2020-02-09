import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDockerFileSystemHandlersService } from './anyopsos-lib-docker-file-system-handlers.service';

describe('AnyOpsOSLibDockerFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDockerFileSystemHandlersService = TestBed.get(AnyOpsOSLibDockerFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
