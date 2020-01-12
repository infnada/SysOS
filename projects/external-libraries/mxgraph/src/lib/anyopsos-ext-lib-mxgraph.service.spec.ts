import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibMxgraphService } from './anyopsos-ext-lib-mxgraph.service';

describe('AnyOpsOSExtLibMxgraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibMxgraphService = TestBed.get(AnyOpsOSExtLibMxgraphService);
    expect(service).toBeTruthy();
  });
});
