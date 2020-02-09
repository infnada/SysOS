import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFileSystemHandlersService } from './anyopsos-lib-netapp-file-system-handlers.service';

describe('AnyOpsOSLibNetappFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFileSystemHandlersService = TestBed.get(AnyOpsOSLibNetappFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
