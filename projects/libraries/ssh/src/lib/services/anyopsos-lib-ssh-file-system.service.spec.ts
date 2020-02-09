import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibSshFileSystemService } from './anyopsos-lib-ssh-file-system.service';

describe('AnyOpsOSLibSshFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibSshFileSystemService = TestBed.get(AnyOpsOSLibSshFileSystemService);
    expect(service).toBeTruthy();
  });
});
