import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureManagerTreeDataService } from './sysos-app-infrastructure-manager-tree-data.service';

describe('SysosAppInfrastructureManagerTreeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureManagerTreeDataService = TestBed.get(SysosAppInfrastructureManagerTreeDataService);
    expect(service).toBeTruthy();
  });
});
