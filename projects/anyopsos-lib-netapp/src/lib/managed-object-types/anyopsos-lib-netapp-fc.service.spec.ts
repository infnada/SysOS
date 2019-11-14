import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFcService } from './anyopsos-lib-netapp-fc.service';

describe('AnyOpsOSLibNetappFcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFcService = TestBed.get(AnyOpsOSLibNetappFcService);
    expect(service).toBeTruthy();
  });
});
