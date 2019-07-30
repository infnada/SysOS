import { TestBed } from '@angular/core/testing';

import { SysosLibNetappConfigBackupService } from './sysos-lib-netapp-config-backup.service';

describe('SysosLibNetappConfigBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappConfigBackupService = TestBed.get(SysosLibNetappConfigBackupService);
    expect(service).toBeTruthy();
  });
});
