import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerNodeGraphService } from './sysos-app-infrastructure-manager-node-graph.service';

describe('SysosAppInfrastructureManagerNodeGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerNodeGraphService = TestBed.get(SysosAppInfrastructureManagerNodeGraphService);
    expect(service).toBeTruthy();
  });
});
