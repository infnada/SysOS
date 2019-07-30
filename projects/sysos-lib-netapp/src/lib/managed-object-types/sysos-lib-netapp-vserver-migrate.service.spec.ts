import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVserverMigrateService } from './sysos-lib-netapp-vserver-migrate.service';

describe('SysosLibNetappVserverMigrateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVserverMigrateService = TestBed.get(SysosLibNetappVserverMigrateService);
    expect(service).toBeTruthy();
  });
});
