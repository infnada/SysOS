import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareScheduledTaskService } from './anyopsos-lib-vmware-scheduled-task.service';

describe('AnyOpsOSLibVmwareScheduledTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareScheduledTaskService = TestBed.get(AnyOpsOSLibVmwareScheduledTaskService);
    expect(service).toBeTruthy();
  });
});
