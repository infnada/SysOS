import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageDiskService } from './anyopsos-lib-netapp-storage-disk.service';

describe('AnyOpsOSLibNetappStorageDiskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageDiskService = TestBed.get(AnyOpsOSLibNetappStorageDiskService);
    expect(service).toBeTruthy();
  });
});
