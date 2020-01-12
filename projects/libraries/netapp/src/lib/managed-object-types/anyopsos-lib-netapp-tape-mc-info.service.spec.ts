import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappTapeMcInfoService } from './anyopsos-lib-netapp-tape-mc-info.service';

describe('AnyOpsOSLibNetappTapeMcInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappTapeMcInfoService = TestBed.get(AnyOpsOSLibNetappTapeMcInfoService);
    expect(service).toBeTruthy();
  });
});
