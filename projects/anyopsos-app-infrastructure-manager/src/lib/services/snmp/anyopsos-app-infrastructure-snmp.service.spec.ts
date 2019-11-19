import { TestBed } from '@angular/core/testing';

import { AnyopsosAppInfrastructureSnmpService } from './anyopsos-app-infrastructure-snmp.service';

describe('AnyopsosAppInfrastructureSnmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyopsosAppInfrastructureSnmpService = TestBed.get(AnyopsosAppInfrastructureSnmpService);
    expect(service).toBeTruthy();
  });
});
