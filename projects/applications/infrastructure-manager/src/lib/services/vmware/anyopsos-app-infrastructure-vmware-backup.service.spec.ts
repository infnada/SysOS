import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureVmwareBackupService } from './anyopsos-app-infrastructure-vmware-backup.service';

describe('AnyOpsOSAppInfrastructureVmwareBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureVmwareBackupService = TestBed.get(AnyOpsOSAppInfrastructureVmwareBackupService);
    expect(service).toBeTruthy();
  });
});
