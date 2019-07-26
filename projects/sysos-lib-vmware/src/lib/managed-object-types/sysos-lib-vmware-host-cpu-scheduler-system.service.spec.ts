import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostCpuSchedulerSystemService } from './sysos-lib-vmware-host-cpu-scheduler-system.service';

describe('SysosLibVmwareHostCpuSchedulerSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostCpuSchedulerSystemService = TestBed.get(SysosLibVmwareHostCpuSchedulerSystemService);
    expect(service).toBeTruthy();
  });
});
