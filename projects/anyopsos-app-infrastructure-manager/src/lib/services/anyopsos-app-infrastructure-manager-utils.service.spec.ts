import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureManagerUtilsService } from './anyopsos-app-infrastructure-manager-utils.service';

describe('AnyOpsOSAppInfrastructureManagerUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureManagerUtilsService = TestBed.get(AnyOpsOSAppInfrastructureManagerUtilsService);
    expect(service).toBeTruthy();
  });
});
