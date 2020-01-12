import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppSftpServerService } from './anyopsos-app-sftp-server.service';

describe('AnyOpsOSAppSftpServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppSftpServerService = TestBed.get(AnyOpsOSAppSftpServerService);
    expect(service).toBeTruthy();
  });
});
