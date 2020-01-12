import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVserverMigrateService } from './anyopsos-lib-netapp-vserver-migrate.service';

describe('AnyOpsOSLibNetappVserverMigrateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVserverMigrateService = TestBed.get(AnyOpsOSLibNetappVserverMigrateService);
    expect(service).toBeTruthy();
  });
});
