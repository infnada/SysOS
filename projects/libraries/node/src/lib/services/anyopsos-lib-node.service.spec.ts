import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeService } from './anyopsos-lib-node.service';

describe('AnyOpsOSLibNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeService = TestBed.get(AnyOpsOSLibNodeService);
    expect(service).toBeTruthy();
  });
});
