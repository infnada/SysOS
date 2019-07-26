import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareGuestProcessManagerService } from './sysos-lib-vmware-guest-process-manager.service';

describe('SysosLibVmwareGuestProcessManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareGuestProcessManagerService = TestBed.get(SysosLibVmwareGuestProcessManagerService);
    expect(service).toBeTruthy();
  });
});
