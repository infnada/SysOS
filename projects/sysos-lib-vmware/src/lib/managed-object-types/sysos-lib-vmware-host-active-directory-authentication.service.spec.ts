import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostActiveDirectoryAuthenticationService } from './sysos-lib-vmware-host-active-directory-authentication.service';

describe('SysosLibVmwareHostActiveDirectoryAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostActiveDirectoryAuthenticationService = TestBed.get(SysosLibVmwareHostActiveDirectoryAuthenticationService);
    expect(service).toBeTruthy();
  });
});
