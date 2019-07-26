import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareScheduledTaskManagerService } from './sysos-lib-vmware-scheduled-task-manager.service';

describe('SysosLibVmwareScheduledTaskManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareScheduledTaskManagerService = TestBed.get(SysosLibVmwareScheduledTaskManagerService);
    expect(service).toBeTruthy();
  });
});
