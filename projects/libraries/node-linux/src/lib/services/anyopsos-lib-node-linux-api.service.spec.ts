import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeLinuxApiService } from './anyopsos-lib-node-linux-api.service';

describe('AnyOpsOSLibNodeLinuxApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeLinuxApiService = TestBed.get(AnyOpsOSLibNodeLinuxApiService);
    expect(service).toBeTruthy();
  });
});
