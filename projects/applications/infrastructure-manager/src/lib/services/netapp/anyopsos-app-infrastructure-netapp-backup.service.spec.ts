import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureNetappBackupService } from './anyopsos-app-infrastructure-netapp-backup.service';

describe('AnyOpsOSAppInfrastructureNetappBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureNetappBackupService = TestBed.get(AnyOpsOSAppInfrastructureNetappBackupService);
    expect(service).toBeTruthy();
  });
});
