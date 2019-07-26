import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCryptoManagerKmipService } from './sysos-lib-vmware-crypto-manager-kmip.service';

describe('SysosLibVmwareCryptoManagerKmipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCryptoManagerKmipService = TestBed.get(SysosLibVmwareCryptoManagerKmipService);
    expect(service).toBeTruthy();
  });
});
