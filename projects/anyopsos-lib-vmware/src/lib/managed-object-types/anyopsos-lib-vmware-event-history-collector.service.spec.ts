import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareEventHistoryCollectorService } from './anyopsos-lib-vmware-event-history-collector.service';

describe('AnyOpsOSLibVmwareEventHistoryCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareEventHistoryCollectorService = TestBed.get(AnyOpsOSLibVmwareEventHistoryCollectorService);
    expect(service).toBeTruthy();
  });
});
