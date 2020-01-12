import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareLicenseManagerService } from './anyopsos-lib-vmware-license-manager.service';

describe('AnyOpsOSLibVmwareLicenseManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareLicenseManagerService = TestBed.get(AnyOpsOSLibVmwareLicenseManagerService);
    expect(service).toBeTruthy();
  });
});
