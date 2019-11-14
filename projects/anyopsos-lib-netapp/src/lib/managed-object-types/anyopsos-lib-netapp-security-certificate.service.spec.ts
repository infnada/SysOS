import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSecurityCertificateService } from './anyopsos-lib-netapp-security-certificate.service';

describe('AnyOpsOSLibNetappSecurityCertificateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSecurityCertificateService = TestBed.get(AnyOpsOSLibNetappSecurityCertificateService);
    expect(service).toBeTruthy();
  });
});
