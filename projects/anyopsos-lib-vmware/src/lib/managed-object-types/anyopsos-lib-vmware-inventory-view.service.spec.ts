import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareInventoryViewService } from './anyopsos-lib-vmware-inventory-view.service';

describe('AnyOpsOSLibVmwareInventoryViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareInventoryViewService = TestBed.get(AnyOpsOSLibVmwareInventoryViewService);
    expect(service).toBeTruthy();
  });
});
