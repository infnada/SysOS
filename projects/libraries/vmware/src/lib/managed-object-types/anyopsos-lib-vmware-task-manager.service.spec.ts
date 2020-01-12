import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareTaskManagerService } from './anyopsos-lib-vmware-task-manager.service';

describe('AnyOpsOSLibVmwareTaskManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareTaskManagerService = TestBed.get(AnyOpsOSLibVmwareTaskManagerService);
    expect(service).toBeTruthy();
  });
});
