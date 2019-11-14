import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareSearchIndexService } from './anyopsos-lib-vmware-search-index.service';

describe('AnyOpsOSLibVmwareSearchIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareSearchIndexService = TestBed.get(AnyOpsOSLibVmwareSearchIndexService);
    expect(service).toBeTruthy();
  });
});
