import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappJobService } from './anyopsos-lib-netapp-job.service';

describe('AnyOpsOSLibNetappJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappJobService = TestBed.get(AnyOpsOSLibNetappJobService);
    expect(service).toBeTruthy();
  });
});
