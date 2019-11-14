import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHistoryCollectorService } from './anyopsos-lib-vmware-history-collector.service';

describe('AnyOpsOSLibVmwareHistoryCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHistoryCollectorService = TestBed.get(AnyOpsOSLibVmwareHistoryCollectorService);
    expect(service).toBeTruthy();
  });
});
