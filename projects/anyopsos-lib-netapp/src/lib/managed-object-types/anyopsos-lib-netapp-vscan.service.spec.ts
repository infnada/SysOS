import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVscanService } from './anyopsos-lib-netapp-vscan.service';

describe('AnyOpsOSLibNetappVscanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVscanService = TestBed.get(AnyOpsOSLibNetappVscanService);
    expect(service).toBeTruthy();
  });
});
