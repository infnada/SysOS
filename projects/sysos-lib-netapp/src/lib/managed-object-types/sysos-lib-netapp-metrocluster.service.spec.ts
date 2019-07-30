import { TestBed } from '@angular/core/testing';

import { SysosLibNetappMetroclusterService } from './sysos-lib-netapp-metrocluster.service';

describe('SysosLibNetappMetroclusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappMetroclusterService = TestBed.get(SysosLibNetappMetroclusterService);
    expect(service).toBeTruthy();
  });
});
