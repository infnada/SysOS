import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareSearchIndexService } from './sysos-lib-vmware-search-index.service';

describe('SysosLibVmwareSearchIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareSearchIndexService = TestBed.get(SysosLibVmwareSearchIndexService);
    expect(service).toBeTruthy();
  });
});
