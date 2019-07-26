import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostSystemService } from './sysos-lib-vmware-host-system.service';

describe('SysosLibVmwareHostSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostSystemService = TestBed.get(SysosLibVmwareHostSystemService);
    expect(service).toBeTruthy();
  });
});
