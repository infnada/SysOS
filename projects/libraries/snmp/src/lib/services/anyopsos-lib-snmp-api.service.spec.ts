import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibSnmpApiService } from './anyopsos-lib-snmp-api.service';

describe('AnyOpsOSLibSnmpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibSnmpApiService = TestBed.get(AnyOpsOSLibSnmpApiService);
    expect(service).toBeTruthy();
  });
});
