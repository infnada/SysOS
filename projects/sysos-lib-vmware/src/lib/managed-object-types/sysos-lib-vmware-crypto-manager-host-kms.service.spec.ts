import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCryptoManagerHostKmsService } from './sysos-lib-vmware-crypto-manager-host-kms.service';

describe('SysosLibVmwareCryptoManagerHostKmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCryptoManagerHostKmsService = TestBed.get(SysosLibVmwareCryptoManagerHostKmsService);
    expect(service).toBeTruthy();
  });
});
