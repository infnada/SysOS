import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareOvfManagerService } from './sysos-lib-vmware-ovf-manager.service';

describe('SysosLibVmwareOvfManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareOvfManagerService = TestBed.get(SysosLibVmwareOvfManagerService);
    expect(service).toBeTruthy();
  });
});
