import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHistoryCollectorService } from './sysos-lib-vmware-history-collector.service';

describe('SysosLibVmwareHistoryCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHistoryCollectorService = TestBed.get(SysosLibVmwareHistoryCollectorService);
    expect(service).toBeTruthy();
  });
});
