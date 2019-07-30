import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFileDirectorySecurityService } from './sysos-lib-netapp-file-directory-security.service';

describe('SysosLibNetappFileDirectorySecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFileDirectorySecurityService = TestBed.get(SysosLibNetappFileDirectorySecurityService);
    expect(service).toBeTruthy();
  });
});
