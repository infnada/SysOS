import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappClusterImageService } from './anyopsos-lib-netapp-cluster-image.service';

describe('AnyOpsOSLibNetappClusterImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappClusterImageService = TestBed.get(AnyOpsOSLibNetappClusterImageService);
    expect(service).toBeTruthy();
  });
});
