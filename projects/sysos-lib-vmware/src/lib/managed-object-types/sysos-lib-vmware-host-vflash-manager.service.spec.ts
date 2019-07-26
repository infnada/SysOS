import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostVflashManagerService } from './sysos-lib-vmware-host-vflash-manager.service';

describe('SysosLibVmwareHostVflashManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostVflashManagerService = TestBed.get(SysosLibVmwareHostVflashManagerService);
    expect(service).toBeTruthy();
  });
});
