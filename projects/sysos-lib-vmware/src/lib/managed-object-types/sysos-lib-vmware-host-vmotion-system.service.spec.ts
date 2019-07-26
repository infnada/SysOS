import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostVmotionSystemService } from './sysos-lib-vmware-host-vmotion-system.service';

describe('SysosLibVmwareHostVmotionSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostVmotionSystemService = TestBed.get(SysosLibVmwareHostVmotionSystemService);
    expect(service).toBeTruthy();
  });
});
