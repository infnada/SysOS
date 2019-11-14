import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostAccessManagerService } from './anyopsos-lib-vmware-host-access-manager.service';

describe('AnyOpsOSLibVmwareHostAccessManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostAccessManagerService = TestBed.get(AnyOpsOSLibVmwareHostAccessManagerService);
    expect(service).toBeTruthy();
  });
});
