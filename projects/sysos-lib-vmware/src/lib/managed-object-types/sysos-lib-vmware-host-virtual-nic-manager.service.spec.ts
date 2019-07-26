import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostVirtualNicManagerService } from './sysos-lib-vmware-host-virtual-nic-manager.service';

describe('SysosLibVmwareHostVirtualNicManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostVirtualNicManagerService = TestBed.get(SysosLibVmwareHostVirtualNicManagerService);
    expect(service).toBeTruthy();
  });
});
