import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageAdapterService } from './anyopsos-lib-netapp-storage-adapter.service';

describe('AnyOpsOSLibNetappStorageAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageAdapterService = TestBed.get(AnyOpsOSLibNetappStorageAdapterService);
    expect(service).toBeTruthy();
  });
});
