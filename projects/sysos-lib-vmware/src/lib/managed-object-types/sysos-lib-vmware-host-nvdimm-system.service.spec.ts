import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostNvdimmSystemService } from './sysos-lib-vmware-host-nvdimm-system.service';

describe('SysosLibVmwareHostNvdimmSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostNvdimmSystemService = TestBed.get(SysosLibVmwareHostNvdimmSystemService);
    expect(service).toBeTruthy();
  });
});
