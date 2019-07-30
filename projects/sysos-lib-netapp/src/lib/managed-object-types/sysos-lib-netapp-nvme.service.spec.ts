import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNvmeService } from './sysos-lib-netapp-nvme.service';

describe('SysosLibNetappNvmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNvmeService = TestBed.get(SysosLibNetappNvmeService);
    expect(service).toBeTruthy();
  });
});
