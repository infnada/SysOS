import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeSnmpApiService } from './anyopsos-lib-node-snmp-api.service';

describe('AnyOpsOSLibNodeSnmpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeSnmpApiService = TestBed.get(AnyOpsOSLibNodeSnmpApiService);
    expect(service).toBeTruthy();
  });
});
