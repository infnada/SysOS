import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareProfileComplianceManagerService } from './anyopsos-lib-vmware-profile-compliance-manager.service';

describe('AnyOpsOSLibVmwareProfileComplianceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareProfileComplianceManagerService = TestBed.get(AnyOpsOSLibVmwareProfileComplianceManagerService);
    expect(service).toBeTruthy();
  });
});
