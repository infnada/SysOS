import { TestBed } from '@angular/core/testing';

import { SysosLibNetappMetroclusterChekConnectionService } from './sysos-lib-netapp-metrocluster-chek-connection.service';

describe('SysosLibNetappMetroclusterChekConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappMetroclusterChekConnectionService = TestBed.get(SysosLibNetappMetroclusterChekConnectionService);
    expect(service).toBeTruthy();
  });
});
