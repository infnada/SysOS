import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostAutoStartManagerService } from './anyopsos-lib-vmware-host-auto-start-manager.service';

describe('AnyOpsOSLibVmwareHostAutoStartManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostAutoStartManagerService = TestBed.get(AnyOpsOSLibVmwareHostAutoStartManagerService);
    expect(service).toBeTruthy();
  });
});
