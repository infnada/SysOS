import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappLockService } from './anyopsos-lib-netapp-lock.service';

describe('AnyOpsOSLibNetappLockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappLockService = TestBed.get(AnyOpsOSLibNetappLockService);
    expect(service).toBeTruthy();
  });
});
