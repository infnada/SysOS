import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostPatchManagerService } from './anyopsos-lib-vmware-host-patch-manager.service';

describe('AnyOpsOSLibVmwareHostPatchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostPatchManagerService = TestBed.get(AnyOpsOSLibVmwareHostPatchManagerService);
    expect(service).toBeTruthy();
  });
});
