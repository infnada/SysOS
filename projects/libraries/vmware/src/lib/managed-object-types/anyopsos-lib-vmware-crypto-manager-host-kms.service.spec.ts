import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareCryptoManagerHostKMSService } from './anyopsos-lib-vmware-crypto-manager-host-kms.service';

describe('AnyOpsOSLibVmwareCryptoManagerHostKmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareCryptoManagerHostKMSService = TestBed.get(AnyOpsOSLibVmwareCryptoManagerHostKMSService);
    expect(service).toBeTruthy();
  });
});
