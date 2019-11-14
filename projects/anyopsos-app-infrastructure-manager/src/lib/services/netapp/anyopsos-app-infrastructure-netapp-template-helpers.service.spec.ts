import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureNetappTemplateHelpersService } from './anyopsos-app-infrastructure-netapp-template-helpers.service';

describe('AnyOpsOSAppInfrastructureNetappTemplateHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureNetappTemplateHelpersService = TestBed.get(AnyOpsOSAppInfrastructureNetappTemplateHelpersService);
    expect(service).toBeTruthy();
  });
});
