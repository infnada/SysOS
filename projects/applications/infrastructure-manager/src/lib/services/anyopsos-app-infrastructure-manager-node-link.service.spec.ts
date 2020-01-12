import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureManagerNodeLinkService } from './anyopsos-app-infrastructure-manager-node-link.service';

describe('AnyOpsOSAppInfrastructureManagerNodeLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureManagerNodeLinkService = TestBed.get(AnyOpsOSAppInfrastructureManagerNodeLinkService);
    expect(service).toBeTruthy();
  });
});
