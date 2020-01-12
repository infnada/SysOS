import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStoragePoolService } from './anyopsos-lib-netapp-storage-pool.service';

describe('AnyOpsOSLibNetappStoragePoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStoragePoolService = TestBed.get(AnyOpsOSLibNetappStoragePoolService);
    expect(service).toBeTruthy();
  });
});
