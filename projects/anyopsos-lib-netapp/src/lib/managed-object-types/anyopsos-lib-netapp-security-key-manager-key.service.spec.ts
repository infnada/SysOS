import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSecurityKeyManagerKeyService } from './anyopsos-lib-netapp-security-key-manager-key.service';

describe('AnyOpsOSLibNetappSecurityKeyManagerKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSecurityKeyManagerKeyService = TestBed.get(AnyOpsOSLibNetappSecurityKeyManagerKeyService);
    expect(service).toBeTruthy();
  });
});
