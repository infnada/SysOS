import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFlexcacheService } from './sysos-lib-netapp-flexcache.service';

describe('SysosLibNetappFlexcacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFlexcacheService = TestBed.get(SysosLibNetappFlexcacheService);
    expect(service).toBeTruthy();
  });
});
