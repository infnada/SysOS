import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareLicenseAssignmentManagerService } from './sysos-lib-vmware-license-assignment-manager.service';

describe('SysosLibVmwareLicenseAssignmentManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareLicenseAssignmentManagerService = TestBed.get(SysosLibVmwareLicenseAssignmentManagerService);
    expect(service).toBeTruthy();
  });
});
