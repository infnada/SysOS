import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappService } from './anyopsos-lib-netapp.service';

describe('AnyOpsOSLibNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappService = TestBed.get(AnyOpsOSLibNetappService);
    expect(service).toBeTruthy();
  });
});
