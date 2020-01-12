import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppSftpLocalService } from './anyopsos-app-sftp-local.service';

describe('AnyOpsOSAppSftpLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppSftpLocalService = TestBed.get(AnyOpsOSAppSftpLocalService);
    expect(service).toBeTruthy();
  });
});
