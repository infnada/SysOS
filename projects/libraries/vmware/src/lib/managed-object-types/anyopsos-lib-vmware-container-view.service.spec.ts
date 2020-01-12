import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareContainerViewService } from './anyopsos-lib-vmware-container-view.service';

describe('AnyOpsOSLibVmwareContainerViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareContainerViewService = TestBed.get(AnyOpsOSLibVmwareContainerViewService);
    expect(service).toBeTruthy();
  });
});
