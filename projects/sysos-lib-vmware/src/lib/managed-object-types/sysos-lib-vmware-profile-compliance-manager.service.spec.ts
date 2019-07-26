import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareProfileComplianceManagerService } from './sysos-lib-vmware-profile-compliance-manager.service';

describe('SysosLibVmwareProfileComplianceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareProfileComplianceManagerService = TestBed.get(SysosLibVmwareProfileComplianceManagerService);
    expect(service).toBeTruthy();
  });
});
