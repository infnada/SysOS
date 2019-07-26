import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostPatchManagerService } from './sysos-lib-vmware-host-patch-manager.service';

describe('SysosLibVmwareHostPatchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostPatchManagerService = TestBed.get(SysosLibVmwareHostPatchManagerService);
    expect(service).toBeTruthy();
  });
});
