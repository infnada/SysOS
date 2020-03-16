import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeLinuxFileSystemHandlersService } from './anyopsos-lib-node-linux-file-system-handlers.service';

describe('AnyOpsOSLibNodeLinuxFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeLinuxFileSystemHandlersService = TestBed.get(AnyOpsOSLibNodeLinuxFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
