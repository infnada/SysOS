import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureManagerNodeMonitorService } from './anyopsos-app-infrastructure-manager-node-monitor.service';

describe('AnyOpsOSAppInfrastructureManagerNodeMonitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureManagerNodeMonitorService = TestBed.get(AnyOpsOSAppInfrastructureManagerNodeMonitorService);
    expect(service).toBeTruthy();
  });
});
