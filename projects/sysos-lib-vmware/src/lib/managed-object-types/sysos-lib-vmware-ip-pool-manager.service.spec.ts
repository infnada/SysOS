import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareIpPoolManagerService } from './sysos-lib-vmware-ip-pool-manager.service';

describe('SysosLibVmwareIpPoolManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareIpPoolManagerService = TestBed.get(SysosLibVmwareIpPoolManagerService);
    expect(service).toBeTruthy();
  });
});
