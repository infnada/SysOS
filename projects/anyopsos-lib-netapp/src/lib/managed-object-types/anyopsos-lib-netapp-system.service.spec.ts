import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSystemService } from './anyopsos-lib-netapp-system.service';

describe('AnyOpsOSLibNetappSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSystemService = TestBed.get(AnyOpsOSLibNetappSystemService);
    expect(service).toBeTruthy();
  });
});
