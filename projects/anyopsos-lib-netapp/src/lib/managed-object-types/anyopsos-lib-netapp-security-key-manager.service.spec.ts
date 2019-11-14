import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSecurityKeyManagerService } from './anyopsos-lib-netapp-security-key-manager.service';

describe('AnyOpsOSLibNetappSecurityKeyManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSecurityKeyManagerService = TestBed.get(AnyOpsOSLibNetappSecurityKeyManagerService);
    expect(service).toBeTruthy();
  });
});
