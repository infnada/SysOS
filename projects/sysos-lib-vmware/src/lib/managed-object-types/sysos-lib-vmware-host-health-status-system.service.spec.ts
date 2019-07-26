import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostHealthStatusSystemService } from './sysos-lib-vmware-host-health-status-system.service';

describe('SysosLibVmwareHostHealthStatusSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostHealthStatusSystemService = TestBed.get(SysosLibVmwareHostHealthStatusSystemService);
    expect(service).toBeTruthy();
  });
});
