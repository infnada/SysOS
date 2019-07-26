import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostProfileManagerService } from './sysos-lib-vmware-host-profile-manager.service';

describe('SysosLibVmwareHostProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostProfileManagerService = TestBed.get(SysosLibVmwareHostProfileManagerService);
    expect(service).toBeTruthy();
  });
});
