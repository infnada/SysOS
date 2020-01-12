import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFileDirectorySecurityService } from './anyopsos-lib-netapp-file-directory-security.service';

describe('AnyOpsOSLibNetappFileDirectorySecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFileDirectorySecurityService = TestBed.get(AnyOpsOSLibNetappFileDirectorySecurityService);
    expect(service).toBeTruthy();
  });
});
