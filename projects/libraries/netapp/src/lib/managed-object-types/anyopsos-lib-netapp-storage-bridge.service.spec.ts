import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageBridgeService } from './anyopsos-lib-netapp-storage-bridge.service';

describe('AnyOpsOSLibNetappStorageBridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageBridgeService = TestBed.get(AnyOpsOSLibNetappStorageBridgeService);
    expect(service).toBeTruthy();
  });
});
