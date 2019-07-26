import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareEventManagerService } from './sysos-lib-vmware-event-manager.service';

describe('SysosLibVmwareEventManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareEventManagerService = TestBed.get(SysosLibVmwareEventManagerService);
    expect(service).toBeTruthy();
  });
});
