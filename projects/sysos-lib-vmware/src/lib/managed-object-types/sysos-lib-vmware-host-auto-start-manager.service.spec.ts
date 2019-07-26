import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostAutoStartManagerService } from './sysos-lib-vmware-host-auto-start-manager.service';

describe('SysosLibVmwareHostAutoStartManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostAutoStartManagerService = TestBed.get(SysosLibVmwareHostAutoStartManagerService);
    expect(service).toBeTruthy();
  });
});
