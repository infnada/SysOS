import { TestBed } from '@angular/core/testing';

import { SysosAppSftpService } from './sysos-app-sftp.service';

describe('SysosAppSftpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppSftpService = TestBed.get(SysosAppSftpService);
    expect(service).toBeTruthy();
  });
});
