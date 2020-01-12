import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostActiveDirectoryAuthenticationService } from './anyopsos-lib-vmware-host-active-directory-authentication.service';

describe('AnyOpsOSLibVmwareHostActiveDirectoryAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostActiveDirectoryAuthenticationService = TestBed.get(AnyOpsOSLibVmwareHostActiveDirectoryAuthenticationService);
    expect(service).toBeTruthy();
  });
});
