import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureSnmpService } from './anyopsos-app-infrastructure-snmp.service';

describe('AnyOpsOSAppInfrastructureSnmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureSnmpService = TestBed.get(AnyOpsOSAppInfrastructureSnmpService);
    expect(service).toBeTruthy();
  });
});
