import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareCryptoManagerKmipService } from './anyopsos-lib-vmware-crypto-manager-kmip.service';

describe('AnyOpsOSLibVmwareCryptoManagerKmipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareCryptoManagerKmipService = TestBed.get(AnyOpsOSLibVmwareCryptoManagerKmipService);
    expect(service).toBeTruthy();
  });
});
