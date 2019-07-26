import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareProfileService } from './sysos-lib-vmware-profile.service';

describe('SysosLibVmwareProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareProfileService = TestBed.get(SysosLibVmwareProfileService);
    expect(service).toBeTruthy();
  });
});
