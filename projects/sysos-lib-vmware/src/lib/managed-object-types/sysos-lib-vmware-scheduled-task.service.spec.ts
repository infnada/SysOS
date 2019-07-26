import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareScheduledTaskService } from './sysos-lib-vmware-scheduled-task.service';

describe('SysosLibVmwareScheduledTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareScheduledTaskService = TestBed.get(SysosLibVmwareScheduledTaskService);
    expect(service).toBeTruthy();
  });
});
