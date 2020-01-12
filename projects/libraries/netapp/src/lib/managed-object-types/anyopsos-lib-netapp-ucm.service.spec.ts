import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappUcmService } from './anyopsos-lib-netapp-ucm.service';

describe('AnyOpsOSLibNetappUcmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappUcmService = TestBed.get(AnyOpsOSLibNetappUcmService);
    expect(service).toBeTruthy();
  });
});
