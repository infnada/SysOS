import { TestBed } from '@angular/core/testing';

import { SysosLibsVmwareService } from './sysos-libs-vmware.service';

describe('SysosLibsVmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsVmwareService = TestBed.get(SysosLibsVmwareService);
    expect(service).toBeTruthy();
  });
});
