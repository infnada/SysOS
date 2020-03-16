import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeSnmpService } from './anyopsos-lib-node-snmp.service';

describe('AnyOpsOSLibNodeSnmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeSnmpService = TestBed.get(AnyOpsOSLibNodeSnmpService);
    expect(service).toBeTruthy();
  });
});
