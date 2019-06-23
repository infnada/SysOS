import { TestBed } from '@angular/core/testing';

import { SysosAppSftpLocalService } from './sysos-app-sftp-local.service';

describe('SysosAppSftpLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppSftpLocalService = TestBed.get(SysosAppSftpLocalService);
    expect(service).toBeTruthy();
  });
});
