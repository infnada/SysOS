import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFeatureService } from './anyopsos-lib-netapp-feature.service';

describe('AnyOpsOSLibNetappFeatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFeatureService = TestBed.get(AnyOpsOSLibNetappFeatureService);
    expect(service).toBeTruthy();
  });
});
