import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareListViewService } from './anyopsos-lib-vmware-list-view.service';

describe('AnyOpsOSLibVmwareListViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareListViewService = TestBed.get(AnyOpsOSLibVmwareListViewService);
    expect(service).toBeTruthy();
  });
});
