import { TestBed } from '@angular/core/testing';

import { SysosLibVmwarePerformanceManagerService } from './sysos-lib-vmware-performance-manager.service';

describe('SysosLibVmwarePerformanceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwarePerformanceManagerService = TestBed.get(SysosLibVmwarePerformanceManagerService);
    expect(service).toBeTruthy();
  });
});
