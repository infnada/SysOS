import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeVmwareFileSystemHandlersService } from './anyopsos-lib-node-vmware-file-system-handlers.service';

describe('AnyOpsOSLibNodeVmwareFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeVmwareFileSystemHandlersService = TestBed.get(AnyOpsOSLibNodeVmwareFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
