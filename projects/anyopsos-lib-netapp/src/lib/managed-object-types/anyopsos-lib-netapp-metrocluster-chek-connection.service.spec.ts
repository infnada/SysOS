import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappMetroclusterChekConnectionService } from './anyopsos-lib-netapp-metrocluster-chek-connection.service';

describe('AnyOpsOSLibNetappMetroclusterChekConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappMetroclusterChekConnectionService = TestBed.get(AnyOpsOSLibNetappMetroclusterChekConnectionService);
    expect(service).toBeTruthy();
  });
});
