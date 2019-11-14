import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostGraphicsManagerService } from './anyopsos-lib-vmware-host-graphics-manager.service';

describe('AnyOpsOSLibVmwareHostGraphicsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostGraphicsManagerService = TestBed.get(AnyOpsOSLibVmwareHostGraphicsManagerService);
    expect(service).toBeTruthy();
  });
});
