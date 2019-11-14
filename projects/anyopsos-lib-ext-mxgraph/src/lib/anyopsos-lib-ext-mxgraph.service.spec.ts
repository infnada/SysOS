import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtMxgraphService } from './anyopsos-lib-ext-mxgraph.service';

describe('AnyOpsOSLibExtMxgraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtMxgraphService = TestBed.get(AnyOpsOSLibExtMxgraphService);
    expect(service).toBeTruthy();
  });
});
