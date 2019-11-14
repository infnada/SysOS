import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappPortsetService } from './anyopsos-lib-netapp-portset.service';

describe('AnyOpsOSLibNetappPortsetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappPortsetService = TestBed.get(AnyOpsOSLibNetappPortsetService);
    expect(service).toBeTruthy();
  });
});
