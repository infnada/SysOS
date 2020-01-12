import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappEnvironmentService } from './anyopsos-lib-netapp-environment.service';

describe('AnyOpsOSLibNetappEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappEnvironmentService = TestBed.get(AnyOpsOSLibNetappEnvironmentService);
    expect(service).toBeTruthy();
  });
});
