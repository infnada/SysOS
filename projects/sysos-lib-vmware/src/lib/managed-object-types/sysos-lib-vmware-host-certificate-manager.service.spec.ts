import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostCertificateManagerService } from './sysos-lib-vmware-host-certificate-manager.service';

describe('SysosLibVmwareHostCertificateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostCertificateManagerService = TestBed.get(SysosLibVmwareHostCertificateManagerService);
    expect(service).toBeTruthy();
  });
});
