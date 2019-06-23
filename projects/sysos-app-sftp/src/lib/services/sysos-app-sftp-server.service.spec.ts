import { TestBed } from '@angular/core/testing';

import { SysosAppSftpServerService } from './sysos-app-sftp-server.service';

describe('SysosAppSftpServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppSftpServerService = TestBed.get(SysosAppSftpServerService);
    expect(service).toBeTruthy();
  });
});
