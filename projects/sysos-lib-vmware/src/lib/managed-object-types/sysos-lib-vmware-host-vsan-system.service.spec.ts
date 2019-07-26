import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostVsanSystemService } from './sysos-lib-vmware-host-vsan-system.service';

describe('SysosLibVmwareHostVsanSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostVsanSystemService = TestBed.get(SysosLibVmwareHostVsanSystemService);
    expect(service).toBeTruthy();
  });
});
