import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostVflashManagerService } from './anyopsos-lib-vmware-host-vflash-manager.service';

describe('AnyOpsOSLibVmwareHostVflashManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostVflashManagerService = TestBed.get(AnyOpsOSLibVmwareHostVflashManagerService);
    expect(service).toBeTruthy();
  });
});
