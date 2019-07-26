import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareTaskHistoryCollectorService } from './sysos-lib-vmware-task-history-collector.service';

describe('SysosLibVmwareTaskHistoryCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareTaskHistoryCollectorService = TestBed.get(SysosLibVmwareTaskHistoryCollectorService);
    expect(service).toBeTruthy();
  });
});
