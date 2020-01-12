import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNvmeService } from './anyopsos-lib-netapp-nvme.service';

describe('AnyOpsOSLibNetappNvmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNvmeService = TestBed.get(AnyOpsOSLibNetappNvmeService);
    expect(service).toBeTruthy();
  });
});
