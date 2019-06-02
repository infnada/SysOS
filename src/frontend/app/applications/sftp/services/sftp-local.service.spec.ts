import { TestBed } from '@angular/core/testing';

import { SftpLocalService } from './sftp-local.service';

describe('SftpLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SftpLocalService = TestBed.get(SftpLocalService);
    expect(service).toBeTruthy();
  });
});
