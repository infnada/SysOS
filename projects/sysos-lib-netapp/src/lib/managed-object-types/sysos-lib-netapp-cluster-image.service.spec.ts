import { TestBed } from '@angular/core/testing';

import { SysosLibNetappClusterImageService } from './sysos-lib-netapp-cluster-image.service';

describe('SysosLibNetappClusterImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappClusterImageService = TestBed.get(SysosLibNetappClusterImageService);
    expect(service).toBeTruthy();
  });
});
