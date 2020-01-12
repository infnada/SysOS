import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappConfigBackupService } from './anyopsos-lib-netapp-config-backup.service';

describe('AnyOpsOSLibNetappConfigBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappConfigBackupService = TestBed.get(AnyOpsOSLibNetappConfigBackupService);
    expect(service).toBeTruthy();
  });
});
