import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureNetappNodeActionsService } from './sysos-app-infrastructure-netapp-node-actions.service';

describe('SysosAppInfrastructureNetappNodeActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureNetappNodeActionsService = TestBed.get(SysosAppInfrastructureNetappNodeActionsService);
    expect(service).toBeTruthy();
  });
});
