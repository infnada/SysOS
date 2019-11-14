import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostLocalAuthenticationService } from './anyopsos-lib-vmware-host-local-authentication.service';

describe('AnyOpsOSLibVmwareHostLocalAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostLocalAuthenticationService = TestBed.get(AnyOpsOSLibVmwareHostLocalAuthenticationService);
    expect(service).toBeTruthy();
  });
});
