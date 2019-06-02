import { TestBed } from '@angular/core/testing';

import { SftpServerService } from './sftp-server.service';

describe('SftpServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SftpServerService = TestBed.get(SftpServerService);
    expect(service).toBeTruthy();
  });
});
