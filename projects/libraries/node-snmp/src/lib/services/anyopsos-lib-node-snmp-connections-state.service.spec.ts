import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeSnmpConnectionsStateService } from './anyopsos-lib-node-snmp-connections-state.service';

describe('AnyOpsOSLibNodeSnmpConnectionsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeSnmpConnectionsStateService = TestBed.get(AnyOpsOSLibNodeSnmpConnectionsStateService);
    expect(service).toBeTruthy();
  });
});
