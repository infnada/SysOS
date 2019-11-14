import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareSessionManagerService } from './anyopsos-lib-vmware-session-manager.service';

describe('AnyOpsOSLibVmwareSessionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareSessionManagerService = TestBed.get(AnyOpsOSLibVmwareSessionManagerService);
    expect(service).toBeTruthy();
  });
});
