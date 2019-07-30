import { TestBed } from '@angular/core/testing';

import { SysosLibNetappMetroclusterDrGroupService } from './sysos-lib-netapp-metrocluster-dr-group.service';

describe('SysosLibNetappMetroclusterDrGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappMetroclusterDrGroupService = TestBed.get(SysosLibNetappMetroclusterDrGroupService);
    expect(service).toBeTruthy();
  });
});
