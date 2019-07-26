import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostKernelModuleSystemService } from './sysos-lib-vmware-host-kernel-module-system.service';

describe('SysosLibVmwareHostKernelModuleSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostKernelModuleSystemService = TestBed.get(SysosLibVmwareHostKernelModuleSystemService);
    expect(service).toBeTruthy();
  });
});
