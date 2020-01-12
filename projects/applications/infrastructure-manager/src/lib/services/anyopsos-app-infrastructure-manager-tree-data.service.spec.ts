import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureManagerTreeDataService } from './anyopsos-app-infrastructure-manager-tree-data.service';

describe('AnyOpsOSAppInfrastructureManagerTreeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureManagerTreeDataService = TestBed.get(AnyOpsOSAppInfrastructureManagerTreeDataService);
    expect(service).toBeTruthy();
  });
});
