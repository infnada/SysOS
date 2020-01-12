import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappClusterService } from './anyopsos-lib-netapp-cluster.service';

describe('AnyOpsOSLibNetappClusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappClusterService = TestBed.get(AnyOpsOSLibNetappClusterService);
    expect(service).toBeTruthy();
  });
});
