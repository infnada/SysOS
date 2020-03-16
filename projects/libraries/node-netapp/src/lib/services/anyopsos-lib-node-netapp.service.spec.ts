import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeNetappService } from './anyopsos-lib-node-netapp.service';

describe('AnyOpsOSLibNodeNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeNetappService = TestBed.get(AnyOpsOSLibNodeNetappService);
    expect(service).toBeTruthy();
  });
});
