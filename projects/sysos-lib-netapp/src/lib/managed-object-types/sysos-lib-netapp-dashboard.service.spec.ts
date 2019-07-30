import { TestBed } from '@angular/core/testing';

import { SysosLibNetappDashboardService } from './sysos-lib-netapp-dashboard.service';

describe('SysosLibNetappDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappDashboardService = TestBed.get(SysosLibNetappDashboardService);
    expect(service).toBeTruthy();
  });
});
