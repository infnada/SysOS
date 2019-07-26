import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareGuestOperationsManagerService } from './sysos-lib-vmware-guest-operations-manager.service';

describe('SysosLibVmwareGuestOperationsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareGuestOperationsManagerService = TestBed.get(SysosLibVmwareGuestOperationsManagerService);
    expect(service).toBeTruthy();
  });
});
