import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareService } from './anyopsos-lib-vmware.service';

describe('AnyOpsOSLibVmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareService = TestBed.get(AnyOpsOSLibVmwareService);
    expect(service).toBeTruthy();
  });
});
