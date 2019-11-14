import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostCpuSchedulerSystemService } from './anyopsos-lib-vmware-host-cpu-scheduler-system.service';

describe('AnyOpsOSLibVmwareHostCpuSchedulerSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostCpuSchedulerSystemService = TestBed.get(AnyOpsOSLibVmwareHostCpuSchedulerSystemService);
    expect(service).toBeTruthy();
  });
});
