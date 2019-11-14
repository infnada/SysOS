import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualAppService } from './anyopsos-lib-vmware-virtual-app.service';

describe('AnyOpsOSLibVmwareVirtualAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualAppService = TestBed.get(AnyOpsOSLibVmwareVirtualAppService);
    expect(service).toBeTruthy();
  });
});
