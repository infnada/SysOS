import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNetgroupService } from './anyopsos-lib-netapp-netgroup.service';

describe('AnyOpsOSLibNetappNetgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNetgroupService = TestBed.get(AnyOpsOSLibNetappNetgroupService);
    expect(service).toBeTruthy();
  });
});
