import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappIgroupService } from './anyopsos-lib-netapp-igroup.service';

describe('AnyOpsOSLibNetappIgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappIgroupService = TestBed.get(AnyOpsOSLibNetappIgroupService);
    expect(service).toBeTruthy();
  });
});
