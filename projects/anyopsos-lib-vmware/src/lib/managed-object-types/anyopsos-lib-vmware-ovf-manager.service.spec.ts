import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareOvfManagerService } from './anyopsos-lib-vmware-ovf-manager.service';

describe('AnyOpsOSLibVmwareOvfManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareOvfManagerService = TestBed.get(AnyOpsOSLibVmwareOvfManagerService);
    expect(service).toBeTruthy();
  });
});
