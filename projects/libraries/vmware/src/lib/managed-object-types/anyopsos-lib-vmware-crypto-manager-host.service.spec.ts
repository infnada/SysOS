import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareCryptoManagerHostService } from './anyopsos-lib-vmware-crypto-manager-host.service';

describe('AnyOpsOSLibVmwareCryptoManagerHostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareCryptoManagerHostService = TestBed.get(AnyOpsOSLibVmwareCryptoManagerHostService);
    expect(service).toBeTruthy();
  });
});
