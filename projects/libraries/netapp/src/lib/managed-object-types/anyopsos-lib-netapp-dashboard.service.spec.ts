import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappDashboardService } from './anyopsos-lib-netapp-dashboard.service';

describe('AnyOpsOSLibNetappDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappDashboardService = TestBed.get(AnyOpsOSLibNetappDashboardService);
    expect(service).toBeTruthy();
  });
});
