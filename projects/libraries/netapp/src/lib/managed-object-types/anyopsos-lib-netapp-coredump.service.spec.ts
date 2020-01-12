import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappCoredumpService } from './anyopsos-lib-netapp-coredump.service';

describe('AnyOpsOSLibNetappCoredumpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappCoredumpService = TestBed.get(AnyOpsOSLibNetappCoredumpService);
    expect(service).toBeTruthy();
  });
});
