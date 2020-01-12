import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareCertificateManagerService } from './anyopsos-lib-vmware-certificate-manager.service';

describe('AnyOpsOSLibVmwareCertificateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareCertificateManagerService = TestBed.get(AnyOpsOSLibVmwareCertificateManagerService);
    expect(service).toBeTruthy();
  });
});
