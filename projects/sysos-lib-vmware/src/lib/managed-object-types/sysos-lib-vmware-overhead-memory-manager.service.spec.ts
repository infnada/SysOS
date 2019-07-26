import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareOverheadMemoryManagerService } from './sysos-lib-vmware-overhead-memory-manager.service';

describe('SysosLibVmwareOverheadMemoryManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareOverheadMemoryManagerService = TestBed.get(SysosLibVmwareOverheadMemoryManagerService);
    expect(service).toBeTruthy();
  });
});
