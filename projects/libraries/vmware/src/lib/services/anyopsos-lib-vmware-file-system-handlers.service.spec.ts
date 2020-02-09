import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareFileSystemHandlersService } from './anyopsos-lib-vmware-file-system-handlers.service';

describe('AnyOpsOSLibVmwareFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareFileSystemHandlersService = TestBed.get(AnyOpsOSLibVmwareFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
