import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappStorageSwitchService } from './anyopsos-lib-netapp-storage-switch.service';

describe('AnyOpsOSLibNetappStorageSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappStorageSwitchService = TestBed.get(AnyOpsOSLibNetappStorageSwitchService);
    expect(service).toBeTruthy();
  });
});
