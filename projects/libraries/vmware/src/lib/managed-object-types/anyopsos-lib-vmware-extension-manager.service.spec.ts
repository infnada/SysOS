import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareExtensionManagerService } from './anyopsos-lib-vmware-extension-manager.service';

describe('AnyOpsOSLibVmwareExtensionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareExtensionManagerService = TestBed.get(AnyOpsOSLibVmwareExtensionManagerService);
    expect(service).toBeTruthy();
  });
});
