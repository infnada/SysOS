import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostProfileService } from './sysos-lib-vmware-host-profile.service';

describe('SysosLibVmwareHostProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostProfileService = TestBed.get(SysosLibVmwareHostProfileService);
    expect(service).toBeTruthy();
  });
});
