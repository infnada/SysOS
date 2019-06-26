import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareService } from './sysos-lib-vmware.service';

describe('SysosLibVmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareService = TestBed.get(SysosLibVmwareService);
    expect(service).toBeTruthy();
  });
});
