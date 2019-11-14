import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNdmpService } from './anyopsos-lib-netapp-ndmp.service';

describe('AnyOpsOSLibNetappNdmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNdmpService = TestBed.get(AnyOpsOSLibNetappNdmpService);
    expect(service).toBeTruthy();
  });
});
