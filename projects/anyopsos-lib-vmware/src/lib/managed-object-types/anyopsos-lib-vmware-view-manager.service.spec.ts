import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareViewManagerService } from './anyopsos-lib-vmware-view-manager.service';

describe('AnyOpsOSLibVmwareViewManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareViewManagerService = TestBed.get(AnyOpsOSLibVmwareViewManagerService);
    expect(service).toBeTruthy();
  });
});
