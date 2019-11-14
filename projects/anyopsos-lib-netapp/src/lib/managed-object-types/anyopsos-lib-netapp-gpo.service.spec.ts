import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappGpoService } from './anyopsos-lib-netapp-gpo.service';

describe('AnyOpsOSLibNetappGpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappGpoService = TestBed.get(AnyOpsOSLibNetappGpoService);
    expect(service).toBeTruthy();
  });
});
