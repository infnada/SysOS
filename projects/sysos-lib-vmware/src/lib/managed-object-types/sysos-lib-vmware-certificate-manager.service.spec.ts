import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCertificateManagerService } from './sysos-lib-vmware-certificate-manager.service';

describe('SysosLibVmwareCertificateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCertificateManagerService = TestBed.get(SysosLibVmwareCertificateManagerService);
    expect(service).toBeTruthy();
  });
});
