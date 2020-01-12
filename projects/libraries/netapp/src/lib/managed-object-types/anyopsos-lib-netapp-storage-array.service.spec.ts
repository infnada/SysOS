import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageArrayService } from './anyopsos-lib-netapp-storage-array.service';

describe('AnyOpsOSLibNetappStorageArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageArrayService = TestBed.get(AnyOpsOSLibNetappStorageArrayService);
    expect(service).toBeTruthy();
  });
});
