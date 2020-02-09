import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibFileSystemFileHandlersService } from './anyopsos-lib-file-system-file-handlers.service';

describe('AnyOpsOSLibFileSystemFileHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibFileSystemFileHandlersService = TestBed.get(AnyOpsOSLibFileSystemFileHandlersService);
    expect(service).toBeTruthy();
  });
});
