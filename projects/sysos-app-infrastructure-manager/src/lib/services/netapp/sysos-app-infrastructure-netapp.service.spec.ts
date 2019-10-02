import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureNetappService } from './sysos-app-infrastructure-netapp.service';

describe('SysosAppInfrastructureNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureNetappService = TestBed.get(SysosAppInfrastructureNetappService);
    expect(service).toBeTruthy();
  });
});
