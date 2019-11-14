import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareTaskHistoryCollectorService } from './anyopsos-lib-vmware-task-history-collector.service';

describe('AnyOpsOSLibVmwareTaskHistoryCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareTaskHistoryCollectorService = TestBed.get(AnyOpsOSLibVmwareTaskHistoryCollectorService);
    expect(service).toBeTruthy();
  });
});
