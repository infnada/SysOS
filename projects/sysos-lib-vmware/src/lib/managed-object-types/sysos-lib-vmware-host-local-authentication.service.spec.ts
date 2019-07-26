import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostLocalAuthenticationService } from './sysos-lib-vmware-host-local-authentication.service';

describe('SysosLibVmwareHostLocalAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostLocalAuthenticationService = TestBed.get(SysosLibVmwareHostLocalAuthenticationService);
    expect(service).toBeTruthy();
  });
});
