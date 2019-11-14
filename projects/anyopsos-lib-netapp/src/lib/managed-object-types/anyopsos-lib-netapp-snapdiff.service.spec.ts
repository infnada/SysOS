import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSnapdiffService } from './anyopsos-lib-netapp-snapdiff.service';

describe('AnyOpsOSLibNetappSnapdiffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSnapdiffService = TestBed.get(AnyOpsOSLibNetappSnapdiffService);
    expect(service).toBeTruthy();
  });
});
