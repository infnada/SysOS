import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappPerfService } from './anyopsos-lib-netapp-perf.service';

describe('AnyOpsOSLibNetappPerfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappPerfService = TestBed.get(AnyOpsOSLibNetappPerfService);
    expect(service).toBeTruthy();
  });
});
