import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeNetappFileSystemHandlersService } from './anyopsos-lib-node-netapp-file-system-handlers.service';

describe('AnyOpsOSLibNodeNetappFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeNetappFileSystemHandlersService = TestBed.get(AnyOpsOSLibNodeNetappFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
