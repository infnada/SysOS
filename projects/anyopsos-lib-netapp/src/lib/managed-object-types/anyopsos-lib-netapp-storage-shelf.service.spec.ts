import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageShelfService } from './anyopsos-lib-netapp-storage-shelf.service';

describe('AnyOpsOSLibNetappStorageShelfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageShelfService = TestBed.get(AnyOpsOSLibNetappStorageShelfService);
    expect(service).toBeTruthy();
  });
});
