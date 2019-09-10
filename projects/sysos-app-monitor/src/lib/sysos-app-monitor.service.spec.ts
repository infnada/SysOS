import { TestBed } from '@angular/core/testing';

import { SysosAppMonitorService } from './sysos-app-monitor.service';

describe('SysosAppMonitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppMonitorService = TestBed.get(SysosAppMonitorService);
    expect(service).toBeTruthy();
  });
});
