import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareViewService } from './anyopsos-lib-vmware-view.service';

describe('AnyOpsOSLibVmwareViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareViewService = TestBed.get(AnyOpsOSLibVmwareViewService);
    expect(service).toBeTruthy();
  });
});
