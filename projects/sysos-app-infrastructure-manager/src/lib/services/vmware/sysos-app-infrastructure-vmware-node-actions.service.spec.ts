import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureVmwareNodeActionsService } from './sysos-app-infrastructure-vmware-node-actions.service';

describe('SysosAppInfrastructureVmwareNodeActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureVmwareNodeActionsService = TestBed.get(SysosAppInfrastructureVmwareNodeActionsService);
    expect(service).toBeTruthy();
  });
});
