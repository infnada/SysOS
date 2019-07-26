import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareEventHistoryCollectorService } from './sysos-lib-vmware-event-history-collector.service';

describe('SysosLibVmwareEventHistoryCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareEventHistoryCollectorService = TestBed.get(SysosLibVmwareEventHistoryCollectorService);
    expect(service).toBeTruthy();
  });
});
