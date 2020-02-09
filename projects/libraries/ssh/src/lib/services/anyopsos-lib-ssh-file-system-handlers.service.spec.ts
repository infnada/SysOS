import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibSshFileSystemHandlersService } from './anyopsos-lib-ssh-file-system-handlers.service';

describe('AnyOpsOSLibSshFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibSshFileSystemHandlersService = TestBed.get(AnyOpsOSLibSshFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
