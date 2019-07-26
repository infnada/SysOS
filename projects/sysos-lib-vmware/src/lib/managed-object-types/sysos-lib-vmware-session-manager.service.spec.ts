import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareSessionManagerService } from './sysos-lib-vmware-session-manager.service';

describe('SysosLibVmwareSessionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareSessionManagerService = TestBed.get(SysosLibVmwareSessionManagerService);
    expect(service).toBeTruthy();
  });
});
