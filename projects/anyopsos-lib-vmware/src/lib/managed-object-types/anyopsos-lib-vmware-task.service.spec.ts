import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareTaskService } from './anyopsos-lib-vmware-task.service';

describe('AnyOpsOSLibVmwareTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareTaskService = TestBed.get(AnyOpsOSLibVmwareTaskService);
    expect(service).toBeTruthy();
  });
});
