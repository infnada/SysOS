import { TestBed } from '@angular/core/testing';

import { SysosLibNetappClusterService } from './sysos-lib-netapp-cluster.service';

describe('SysosLibNetappClusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappClusterService = TestBed.get(SysosLibNetappClusterService);
    expect(service).toBeTruthy();
  });
});
