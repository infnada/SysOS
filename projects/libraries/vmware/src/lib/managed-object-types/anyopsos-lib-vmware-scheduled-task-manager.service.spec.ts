import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareScheduledTaskManagerService } from './anyopsos-lib-vmware-scheduled-task-manager.service';

describe('AnyOpsOSLibVmwareScheduledTaskManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareScheduledTaskManagerService = TestBed.get(AnyOpsOSLibVmwareScheduledTaskManagerService);
    expect(service).toBeTruthy();
  });
});
