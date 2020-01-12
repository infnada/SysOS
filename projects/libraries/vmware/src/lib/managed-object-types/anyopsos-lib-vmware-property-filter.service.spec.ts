import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwarePropertyFilterService } from './anyopsos-lib-vmware-property-filter.service';

describe('AnyOpsOSLibVmwarePropertyFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwarePropertyFilterService = TestBed.get(AnyOpsOSLibVmwarePropertyFilterService);
    expect(service).toBeTruthy();
  });
});
