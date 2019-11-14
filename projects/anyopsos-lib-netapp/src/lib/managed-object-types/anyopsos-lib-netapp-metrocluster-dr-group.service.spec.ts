import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappMetroclusterDrGroupService } from './anyopsos-lib-netapp-metrocluster-dr-group.service';

describe('AnyOpsOSLibNetappMetroclusterDrGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappMetroclusterDrGroupService = TestBed.get(AnyOpsOSLibNetappMetroclusterDrGroupService);
    expect(service).toBeTruthy();
  });
});
