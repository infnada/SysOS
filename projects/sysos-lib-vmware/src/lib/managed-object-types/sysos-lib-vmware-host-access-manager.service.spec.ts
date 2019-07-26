import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostAccessManagerService } from './sysos-lib-vmware-host-access-manager.service';

describe('SysosLibVmwareHostAccessManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostAccessManagerService = TestBed.get(SysosLibVmwareHostAccessManagerService);
    expect(service).toBeTruthy();
  });
});
