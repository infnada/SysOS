import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNameserviceService } from './anyopsos-lib-netapp-nameservice.service';

describe('AnyOpsOSLibNetappNameserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNameserviceService = TestBed.get(AnyOpsOSLibNetappNameserviceService);
    expect(service).toBeTruthy();
  });
});
