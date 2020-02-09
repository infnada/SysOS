import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibSnmpService } from './anyopsos-lib-snmp.service';

describe('AnyOpsOSLibSnmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibSnmpService = TestBed.get(AnyOpsOSLibSnmpService);
    expect(service).toBeTruthy();
  });
});
