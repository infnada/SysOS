import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappCfService } from './anyopsos-lib-netapp-cf.service';

describe('AnyOpsOSLibNetappCfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappCfService = TestBed.get(AnyOpsOSLibNetappCfService);
    expect(service).toBeTruthy();
  });
});
