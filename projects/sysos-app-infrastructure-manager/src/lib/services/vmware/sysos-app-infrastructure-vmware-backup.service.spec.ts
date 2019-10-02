import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureVmwareBackupService } from './sysos-app-infrastructure-vmware-backup.service';

describe('SysosAppInfrastructureVmwareBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureVmwareBackupService = TestBed.get(SysosAppInfrastructureVmwareBackupService);
    expect(service).toBeTruthy();
  });
});
