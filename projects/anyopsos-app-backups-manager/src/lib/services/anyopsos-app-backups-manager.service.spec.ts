import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppBackupsManagerService } from './anyopsos-app-backups-manager.service';

describe('AnyOpsOSAppBackupsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppBackupsManagerService = TestBed.get(AnyOpsOSAppBackupsManagerService);
    expect(service).toBeTruthy();
  });
});
