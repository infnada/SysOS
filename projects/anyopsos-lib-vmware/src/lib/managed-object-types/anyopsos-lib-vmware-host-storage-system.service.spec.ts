import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostStorageSystemService } from './anyopsos-lib-vmware-host-storage-system.service';

describe('AnyOpsOSLibVmwareHostStorageSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostStorageSystemService = TestBed.get(AnyOpsOSLibVmwareHostStorageSystemService);
    expect(service).toBeTruthy();
  });
});
