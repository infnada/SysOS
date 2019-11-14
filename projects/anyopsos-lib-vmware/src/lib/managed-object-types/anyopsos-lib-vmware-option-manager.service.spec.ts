import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareOptionManagerService } from './anyopsos-lib-vmware-option-manager.service';

describe('AnyOpsOSLibVmwareOptionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareOptionManagerService = TestBed.get(AnyOpsOSLibVmwareOptionManagerService);
    expect(service).toBeTruthy();
  });
});
