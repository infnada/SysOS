import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappOptionsService } from './anyopsos-lib-netapp-options.service';

describe('AnyOpsOSLibNetappOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappOptionsService = TestBed.get(AnyOpsOSLibNetappOptionsService);
    expect(service).toBeTruthy();
  });
});
