import { TestBed } from '@angular/core/testing';

import { SysosLibNetappStorageBridgeService } from './sysos-lib-netapp-storage-bridge.service';

describe('SysosLibNetappStorageBridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappStorageBridgeService = TestBed.get(SysosLibNetappStorageBridgeService);
    expect(service).toBeTruthy();
  });
});
