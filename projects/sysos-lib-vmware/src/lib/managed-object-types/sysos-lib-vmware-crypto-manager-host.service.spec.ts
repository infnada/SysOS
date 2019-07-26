import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCryptoManagerHostService } from './sysos-lib-vmware-crypto-manager-host.service';

describe('SysosLibVmwareCryptoManagerHostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCryptoManagerHostService = TestBed.get(SysosLibVmwareCryptoManagerHostService);
    expect(service).toBeTruthy();
  });
});
