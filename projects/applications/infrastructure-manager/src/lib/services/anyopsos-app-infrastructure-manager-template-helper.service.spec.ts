import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureManagerTemplateHelperService } from './anyopsos-app-infrastructure-manager-template-helper.service';

describe('AnyOpsOSAppInfrastructureManagerTemplateHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureManagerTemplateHelperService = TestBed.get(AnyOpsOSAppInfrastructureManagerTemplateHelperService);
    expect(service).toBeTruthy();
  });
});
