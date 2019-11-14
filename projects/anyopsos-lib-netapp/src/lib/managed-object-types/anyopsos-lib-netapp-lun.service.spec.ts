import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappLunService } from './anyopsos-lib-netapp-lun.service';

describe('AnyOpsOSLibNetappLunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappLunService = TestBed.get(AnyOpsOSLibNetappLunService);
    expect(service).toBeTruthy();
  });
});
