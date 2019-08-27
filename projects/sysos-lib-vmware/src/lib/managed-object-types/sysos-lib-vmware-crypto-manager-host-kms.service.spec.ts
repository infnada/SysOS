import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCryptoManagerHostKMSService } from './sysos-lib-vmware-crypto-manager-host-kms.service';

describe('SysosLibVmwareCryptoManagerHostKmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCryptoManagerHostKMSService = TestBed.get(SysosLibVmwareCryptoManagerHostKMSService);
    expect(service).toBeTruthy();
  });
});
