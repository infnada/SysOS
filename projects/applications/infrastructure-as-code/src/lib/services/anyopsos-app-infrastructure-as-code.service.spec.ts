import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureAsCodeService } from './anyopsos-app-infrastructure-as-code.service';

describe('AnyOpsOSAppInfrastructureAsCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureAsCodeService = TestBed.get(AnyOpsOSAppInfrastructureAsCodeService);
    expect(service).toBeTruthy();
  });
});
