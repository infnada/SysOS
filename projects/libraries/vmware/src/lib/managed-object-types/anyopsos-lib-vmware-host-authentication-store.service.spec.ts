import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostAuthenticationStoreService } from './anyopsos-lib-vmware-host-authentication-store.service';

describe('AnyOpsOSLibVmwareHostAuthenticationStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostAuthenticationStoreService = TestBed.get(AnyOpsOSLibVmwareHostAuthenticationStoreService);
    expect(service).toBeTruthy();
  });
});
