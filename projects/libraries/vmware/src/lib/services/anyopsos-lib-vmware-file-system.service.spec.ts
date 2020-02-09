import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareFileSystemService } from './anyopsos-lib-vmware-file-system.service';

describe('AnyOpsOSLibVmwareFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareFileSystemService = TestBed.get(AnyOpsOSLibVmwareFileSystemService);
    expect(service).toBeTruthy();
  });
});
