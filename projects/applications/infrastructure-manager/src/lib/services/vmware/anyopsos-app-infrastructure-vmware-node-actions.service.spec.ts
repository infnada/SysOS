import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureVmwareNodeActionsService } from './anyopsos-app-infrastructure-vmware-node-actions.service';

describe('AnyOpsOSAppInfrastructureVmwareNodeActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureVmwareNodeActionsService = TestBed.get(AnyOpsOSAppInfrastructureVmwareNodeActionsService);
    expect(service).toBeTruthy();
  });
});
