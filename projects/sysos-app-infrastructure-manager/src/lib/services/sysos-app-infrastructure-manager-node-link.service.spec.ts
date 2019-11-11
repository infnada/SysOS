import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerNodeLinkService } from './sysos-app-infrastructure-manager-node-link.service';

describe('SysosAppInfrastructureManagerNodeLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerNodeLinkService = TestBed.get(SysosAppInfrastructureManagerNodeLinkService);
    expect(service).toBeTruthy();
  });
});
