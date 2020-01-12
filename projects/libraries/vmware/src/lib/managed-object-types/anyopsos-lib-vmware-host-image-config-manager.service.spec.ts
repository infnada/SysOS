import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostImageConfigManagerService } from './anyopsos-lib-vmware-host-image-config-manager.service';

describe('AnyOpsOSLibVmwareHostImageConfigManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostImageConfigManagerService = TestBed.get(AnyOpsOSLibVmwareHostImageConfigManagerService);
    expect(service).toBeTruthy();
  });
});
