import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareLicenseAssignmentManagerService } from './anyopsos-lib-vmware-license-assignment-manager.service';

describe('AnyOpsOSLibVmwareLicenseAssignmentManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareLicenseAssignmentManagerService = TestBed.get(AnyOpsOSLibVmwareLicenseAssignmentManagerService);
    expect(service).toBeTruthy();
  });
});
