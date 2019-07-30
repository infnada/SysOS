import { TestBed } from '@angular/core/testing';

import { SysosLibNetappClusterSwitchService } from './sysos-lib-netapp-cluster-switch.service';

describe('SysosLibNetappClusterSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappClusterSwitchService = TestBed.get(SysosLibNetappClusterSwitchService);
    expect(service).toBeTruthy();
  });
});
