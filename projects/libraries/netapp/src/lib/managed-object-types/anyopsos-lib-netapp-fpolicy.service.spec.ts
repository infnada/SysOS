import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFpolicyService } from './anyopsos-lib-netapp-fpolicy.service';

describe('AnyOpsOSLibNetappFpolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFpolicyService = TestBed.get(AnyOpsOSLibNetappFpolicyService);
    expect(service).toBeTruthy();
  });
});
