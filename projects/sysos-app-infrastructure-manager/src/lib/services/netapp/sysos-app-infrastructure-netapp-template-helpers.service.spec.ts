import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureNetappTemplateHelpersService } from './sysos-app-infrastructure-netapp-template-helpers.service';

describe('SysosAppInfrastructureNetappTemplateHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureNetappTemplateHelpersService = TestBed.get(SysosAppInfrastructureNetappTemplateHelpersService);
    expect(service).toBeTruthy();
  });
});
