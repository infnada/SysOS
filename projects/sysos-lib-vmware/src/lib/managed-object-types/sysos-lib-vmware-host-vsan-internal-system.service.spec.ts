import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostVsanInternalSystemService } from './sysos-lib-vmware-host-vsan-internal-system.service';

describe('SysosLibVmwareHostVsanInternalSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostVsanInternalSystemService = TestBed.get(SysosLibVmwareHostVsanInternalSystemService);
    expect(service).toBeTruthy();
  });
});
