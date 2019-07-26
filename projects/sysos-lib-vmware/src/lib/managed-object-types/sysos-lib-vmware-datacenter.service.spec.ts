import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDatacenterService } from './sysos-lib-vmware-datacenter.service';

describe('SysosLibVmwareDatacenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDatacenterService = TestBed.get(SysosLibVmwareDatacenterService);
    expect(service).toBeTruthy();
  });
});
