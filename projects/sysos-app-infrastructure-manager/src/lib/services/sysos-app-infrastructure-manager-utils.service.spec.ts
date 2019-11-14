import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerUtilsService } from './sysos-app-infrastructure-manager-utils.service';

describe('SysosAppInfrastructureManagerUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerUtilsService = TestBed.get(SysosAppInfrastructureManagerUtilsService);
    expect(service).toBeTruthy();
  });
});
