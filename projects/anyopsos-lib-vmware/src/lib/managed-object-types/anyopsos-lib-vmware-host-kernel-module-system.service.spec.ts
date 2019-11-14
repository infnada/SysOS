import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostKernelModuleSystemService } from './anyopsos-lib-vmware-host-kernel-module-system.service';

describe('AnyOpsOSLibVmwareHostKernelModuleSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostKernelModuleSystemService = TestBed.get(AnyOpsOSLibVmwareHostKernelModuleSystemService);
    expect(service).toBeTruthy();
  });
});
