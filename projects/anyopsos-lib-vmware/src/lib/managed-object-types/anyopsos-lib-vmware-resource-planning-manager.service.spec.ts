import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareResourcePlanningManagerService } from './anyopsos-lib-vmware-resource-planning-manager.service';

describe('AnyOpsOSLibVmwareResourcePlanningManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareResourcePlanningManagerService = TestBed.get(AnyOpsOSLibVmwareResourcePlanningManagerService);
    expect(service).toBeTruthy();
  });
});
