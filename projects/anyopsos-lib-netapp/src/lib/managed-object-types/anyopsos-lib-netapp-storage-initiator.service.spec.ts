import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageInitiatorService } from './anyopsos-lib-netapp-storage-initiator.service';

describe('AnyOpsOSLibNetappStorageInitiatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageInitiatorService = TestBed.get(AnyOpsOSLibNetappStorageInitiatorService);
    expect(service).toBeTruthy();
  });
});
