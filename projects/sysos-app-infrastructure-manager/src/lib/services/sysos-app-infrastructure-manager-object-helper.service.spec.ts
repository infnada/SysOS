import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerObjectHelperService } from './sysos-app-infrastructure-manager-object-helper.service';

describe('SysosAppInfrastructureManagerObjectHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerObjectHelperService = TestBed.get(SysosAppInfrastructureManagerObjectHelperService);
    expect(service).toBeTruthy();
  });
});
