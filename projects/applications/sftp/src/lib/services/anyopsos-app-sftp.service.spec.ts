import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppSftpService } from './anyopsos-app-sftp.service';

describe('AnyOpsOSAppSftpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppSftpService = TestBed.get(AnyOpsOSAppSftpService);
    expect(service).toBeTruthy();
  });
});
