import { TestBed } from '@angular/core/testing';

import { SftpService } from './sftp.service';

describe('SftpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SftpService = TestBed.get(SftpService);
    expect(service).toBeTruthy();
  });
});
