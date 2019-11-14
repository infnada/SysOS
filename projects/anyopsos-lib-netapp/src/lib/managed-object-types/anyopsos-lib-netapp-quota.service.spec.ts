import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappQuotaService } from './anyopsos-lib-netapp-quota.service';

describe('AnyOpsOSLibNetappQuotaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappQuotaService = TestBed.get(AnyOpsOSLibNetappQuotaService);
    expect(service).toBeTruthy();
  });
});
