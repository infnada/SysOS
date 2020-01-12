import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareServiceManagerService } from './anyopsos-lib-vmware-service-manager.service';

describe('AnyOpsOSLibVmwareServiceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareServiceManagerService = TestBed.get(AnyOpsOSLibVmwareServiceManagerService);
    expect(service).toBeTruthy();
  });
});
