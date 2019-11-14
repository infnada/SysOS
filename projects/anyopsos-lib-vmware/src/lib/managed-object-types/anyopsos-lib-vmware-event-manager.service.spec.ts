import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareEventManagerService } from './anyopsos-lib-vmware-event-manager.service';

describe('AnyOpsOSLibVmwareEventManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareEventManagerService = TestBed.get(AnyOpsOSLibVmwareEventManagerService);
    expect(service).toBeTruthy();
  });
});
