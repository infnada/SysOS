import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSisService } from './anyopsos-lib-netapp-sis.service';

describe('AnyOpsOSLibNetappSisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSisService = TestBed.get(AnyOpsOSLibNetappSisService);
    expect(service).toBeTruthy();
  });
});
