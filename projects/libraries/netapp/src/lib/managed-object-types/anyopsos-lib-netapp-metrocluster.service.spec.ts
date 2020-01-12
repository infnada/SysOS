import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappMetroclusterService } from './anyopsos-lib-netapp-metrocluster.service';

describe('AnyOpsOSLibNetappMetroclusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappMetroclusterService = TestBed.get(AnyOpsOSLibNetappMetroclusterService);
    expect(service).toBeTruthy();
  });
});
