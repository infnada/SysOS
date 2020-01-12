import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFlashService } from './anyopsos-lib-netapp-flash.service';

describe('AnyOpsOSLibNetappFlashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFlashService = TestBed.get(AnyOpsOSLibNetappFlashService);
    expect(service).toBeTruthy();
  });
});
