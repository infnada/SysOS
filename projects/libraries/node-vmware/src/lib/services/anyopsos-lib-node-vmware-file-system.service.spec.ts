import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeVmwareFileSystemService } from './anyopsos-lib-node-vmware-file-system.service';

describe('AnyOpsOSLibNodeVmwareFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeVmwareFileSystemService = TestBed.get(AnyOpsOSLibNodeVmwareFileSystemService);
    expect(service).toBeTruthy();
  });
});
