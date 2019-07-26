import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareTaskManagerService } from './sysos-lib-vmware-task-manager.service';

describe('SysosLibVmwareTaskManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareTaskManagerService = TestBed.get(SysosLibVmwareTaskManagerService);
    expect(service).toBeTruthy();
  });
});
