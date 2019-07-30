import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareInventoryViewService } from './sysos-lib-vmware-inventory-view.service';

describe('SysosLibVmwareInventoryViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareInventoryViewService = TestBed.get(SysosLibVmwareInventoryViewService);
    expect(service).toBeTruthy();
  });
});
