import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostCertificateManagerService } from './anyopsos-lib-vmware-host-certificate-manager.service';

describe('AnyOpsOSLibVmwareHostCertificateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostCertificateManagerService = TestBed.get(AnyOpsOSLibVmwareHostCertificateManagerService);
    expect(service).toBeTruthy();
  });
});
