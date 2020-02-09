import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibSnmpConnectionsStateService } from './anyopsos-lib-snmp-connections-state.service';

describe('AnyOpsOSLibSnmpConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibSnmpConnectionsStateService = TestBed.get(AnyOpsOSLibSnmpConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
