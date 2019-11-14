import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareFileManagerService } from './anyopsos-lib-vmware-file-manager.service';

describe('AnyOpsOSLibVmwareFileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareFileManagerService = TestBed.get(AnyOpsOSLibVmwareFileManagerService);
    expect(service).toBeTruthy();
  });
});
