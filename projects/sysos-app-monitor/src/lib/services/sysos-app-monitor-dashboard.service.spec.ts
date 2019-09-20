import { TestBed } from '@angular/core/testing';

import { SysosAppMonitorDashboardService } from './sysos-app-monitor-dashboard.service';

describe('SysosAppMonitorDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppMonitorDashboardService = TestBed.get(SysosAppMonitorDashboardService);
    expect(service).toBeTruthy();
  });
});
