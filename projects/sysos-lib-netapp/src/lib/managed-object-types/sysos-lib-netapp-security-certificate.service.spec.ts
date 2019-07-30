import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSecurityCertificateService } from './sysos-lib-netapp-security-certificate.service';

describe('SysosLibNetappSecurityCertificateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSecurityCertificateService = TestBed.get(SysosLibNetappSecurityCertificateService);
    expect(service).toBeTruthy();
  });
});
