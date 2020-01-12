import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappAggrService } from './anyopsos-lib-netapp-aggr.service';

describe('AnyOpsOSLibNetappAggrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappAggrService = TestBed.get(AnyOpsOSLibNetappAggrService);
    expect(service).toBeTruthy();
  });
});
