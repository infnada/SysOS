import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStoragePortService } from './anyopsos-lib-netapp-storage-port.service';

describe('AnyOpsOSLibNetappStoragePortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStoragePortService = TestBed.get(AnyOpsOSLibNetappStoragePortService);
    expect(service).toBeTruthy();
  });
});
