import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFlexcacheService } from './anyopsos-lib-netapp-flexcache.service';

describe('AnyOpsOSLibNetappFlexcacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFlexcacheService = TestBed.get(AnyOpsOSLibNetappFlexcacheService);
    expect(service).toBeTruthy();
  });
});
