import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerService } from './sysos-app-infrastructure-manager.service';

describe('SysosAppInfrastructureManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerService = TestBed.get(SysosAppInfrastructureManagerService);
    expect(service).toBeTruthy();
  });
});
