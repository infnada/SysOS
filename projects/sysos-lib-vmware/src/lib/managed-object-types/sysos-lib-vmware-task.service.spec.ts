import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareTaskService } from './sysos-lib-vmware-task.service';

describe('SysosLibVmwareTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareTaskService = TestBed.get(SysosLibVmwareTaskService);
    expect(service).toBeTruthy();
  });
});
