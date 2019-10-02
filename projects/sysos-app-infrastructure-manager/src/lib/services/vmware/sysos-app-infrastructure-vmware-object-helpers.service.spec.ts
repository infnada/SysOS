import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureVmwareObjectHelpersService } from './sysos-app-infrastructure-vmware-object-helpers.service';

describe('SysosAppInfrastructureVmwareObjectHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureVmwareObjectHelpersService = TestBed.get(SysosAppInfrastructureVmwareObjectHelpersService);
    expect(service).toBeTruthy();
  });
});
