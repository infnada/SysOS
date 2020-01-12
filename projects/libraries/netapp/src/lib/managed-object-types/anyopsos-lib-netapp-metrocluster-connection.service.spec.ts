import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappMetroclusterConnectionService } from './anyopsos-lib-netapp-metrocluster-connection.service';

describe('AnyOpsOSLibNetappMetroclusterConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappMetroclusterConnectionService = TestBed.get(AnyOpsOSLibNetappMetroclusterConnectionService);
    expect(service).toBeTruthy();
  });
});
