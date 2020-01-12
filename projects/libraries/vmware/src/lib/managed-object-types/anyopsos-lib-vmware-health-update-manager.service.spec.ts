import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHealthUpdateManagerService } from './anyopsos-lib-vmware-health-update-manager.service';

describe('AnyOpsOSLibVmwareHealthUpdateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHealthUpdateManagerService = TestBed.get(AnyOpsOSLibVmwareHealthUpdateManagerService);
    expect(service).toBeTruthy();
  });
});
