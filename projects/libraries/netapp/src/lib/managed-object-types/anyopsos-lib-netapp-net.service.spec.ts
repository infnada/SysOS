import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNetService } from './anyopsos-lib-netapp-net.service';

describe('AnyOpsOSLibNetappNetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNetService = TestBed.get(AnyOpsOSLibNetappNetService);
    expect(service).toBeTruthy();
  });
});
