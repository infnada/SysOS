import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappMetroclusterInterfaceService } from './anyopsos-lib-netapp-metrocluster-interface.service';

describe('AnyOpsOSLibNetappMetroclusterInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappMetroclusterInterfaceService = TestBed.get(AnyOpsOSLibNetappMetroclusterInterfaceService);
    expect(service).toBeTruthy();
  });
});
