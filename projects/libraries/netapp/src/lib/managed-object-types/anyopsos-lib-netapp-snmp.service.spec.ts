import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSnmpService } from './anyopsos-lib-netapp-snmp.service';

describe('AnyOpsOSLibNetappSnmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSnmpService = TestBed.get(AnyOpsOSLibNetappSnmpService);
    expect(service).toBeTruthy();
  });
});
