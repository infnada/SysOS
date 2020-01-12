import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostDirectoryStoreService } from './anyopsos-lib-vmware-host-directory-store.service';

describe('AnyOpsOSLibVmwareHostDirectoryStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostDirectoryStoreService = TestBed.get(AnyOpsOSLibVmwareHostDirectoryStoreService);
    expect(service).toBeTruthy();
  });
});
