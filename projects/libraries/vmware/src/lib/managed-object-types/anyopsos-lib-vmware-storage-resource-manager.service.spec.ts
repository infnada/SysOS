import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareStorageResourceManagerService } from './anyopsos-lib-vmware-storage-resource-manager.service';

describe('AnyOpsOSLibVmwareStorageResourceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareStorageResourceManagerService = TestBed.get(AnyOpsOSLibVmwareStorageResourceManagerService);
    expect(service).toBeTruthy();
  });
});
