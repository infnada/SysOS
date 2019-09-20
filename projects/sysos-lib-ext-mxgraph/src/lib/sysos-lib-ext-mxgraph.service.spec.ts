import { TestBed } from '@angular/core/testing';

import { SysosLibExtMxgraphService } from './sysos-lib-ext-mxgraph.service';

describe('SysosLibExtMxgraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtMxgraphService = TestBed.get(SysosLibExtMxgraphService);
    expect(service).toBeTruthy();
  });
});
