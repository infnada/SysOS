import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureAsCodeProjectTreeService } from './anyopsos-app-infrastructure-as-code-project-tree.service';

describe('AnyOpsOSAppInfrastructureAsCodeProjectTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureAsCodeProjectTreeService = TestBed.get(AnyOpsOSAppInfrastructureAsCodeProjectTreeService);
    expect(service).toBeTruthy();
  });
});
