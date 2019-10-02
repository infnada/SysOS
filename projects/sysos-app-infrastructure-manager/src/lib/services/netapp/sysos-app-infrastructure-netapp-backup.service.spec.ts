import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureNetappBackupService } from './sysos-app-infrastructure-netapp-backup.service';

describe('SysosAppInfrastructureNetappBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureNetappBackupService = TestBed.get(SysosAppInfrastructureNetappBackupService);
    expect(service).toBeTruthy();
  });
});
