import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareManagedObjectViewService } from './anyopsos-lib-vmware-managed-object-view.service';

describe('AnyOpsOSLibVmwareManagedObjectViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareManagedObjectViewService = TestBed.get(AnyOpsOSLibVmwareManagedObjectViewService);
    expect(service).toBeTruthy();
  });
});
