import { TestBed } from '@angular/core/testing';

import { SysosLibMxgraphService } from './sysos-lib-mxgraph.service';

describe('SysosLibMxgraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibMxgraphService = TestBed.get(SysosLibMxgraphService);
    expect(service).toBeTruthy();
  });
});
