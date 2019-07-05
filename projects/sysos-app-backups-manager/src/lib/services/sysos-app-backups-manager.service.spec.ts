import { TestBed } from '@angular/core/testing';

import { SysosAppBackupsManagerService } from './sysos-app-backups-manager.service';

describe('SysosAppBackupsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppBackupsManagerService = TestBed.get(SysosAppBackupsManagerService);
    expect(service).toBeTruthy();
  });
});
