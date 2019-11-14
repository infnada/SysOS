import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSecdService } from './anyopsos-lib-netapp-secd.service';

describe('AnyOpsOSLibNetappSecdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSecdService = TestBed.get(AnyOpsOSLibNetappSecdService);
    expect(service).toBeTruthy();
  });
});
