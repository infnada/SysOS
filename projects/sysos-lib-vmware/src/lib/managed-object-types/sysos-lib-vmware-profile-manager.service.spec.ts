import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareProfileManagerService } from './sysos-lib-vmware-profile-manager.service';

describe('SysosLibVmwareProfileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareProfileManagerService = TestBed.get(SysosLibVmwareProfileManagerService);
    expect(service).toBeTruthy();
  });
});
