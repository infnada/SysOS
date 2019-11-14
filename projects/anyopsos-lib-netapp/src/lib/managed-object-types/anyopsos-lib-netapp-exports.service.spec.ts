import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappExportsService } from './anyopsos-lib-netapp-exports.service';

describe('AnyOpsOSLibNetappExportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappExportsService = TestBed.get(AnyOpsOSLibNetappExportsService);
    expect(service).toBeTruthy();
  });
});
