import { TestBed } from '@angular/core/testing';

import { SysosLibNetappQuotaService } from './sysos-lib-netapp-quota.service';

describe('SysosLibNetappQuotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappQuotaService = TestBed.get(SysosLibNetappQuotaService);
    expect(service).toBeTruthy();
  });
});
