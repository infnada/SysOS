import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureVmwareTemplateHelpersService } from './sysos-app-infrastructure-vmware-template-helpers.service';

describe('SysosAppInfrastructureVmwareTemplateHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureVmwareTemplateHelpersService = TestBed.get(SysosAppInfrastructureVmwareTemplateHelpersService);
    expect(service).toBeTruthy();
  });
});
