import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostNvdimmSystemService } from './anyopsos-lib-vmware-host-nvdimm-system.service';

describe('AnyOpsOSLibVmwareHostNvdimmSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostNvdimmSystemService = TestBed.get(AnyOpsOSLibVmwareHostNvdimmSystemService);
    expect(service).toBeTruthy();
  });
});
