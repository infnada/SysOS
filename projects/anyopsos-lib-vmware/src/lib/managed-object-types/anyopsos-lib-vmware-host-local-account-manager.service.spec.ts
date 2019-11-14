import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostLocalAccountManagerService } from './anyopsos-lib-vmware-host-local-account-manager.service';

describe('AnyOpsOSLibVmwareHostLocalAccountManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostLocalAccountManagerService = TestBed.get(AnyOpsOSLibVmwareHostLocalAccountManagerService);
    expect(service).toBeTruthy();
  });
});
