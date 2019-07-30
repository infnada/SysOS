import { TestBed } from '@angular/core/testing';

import { SysosLibNetappMetroclusterConnectionService } from './sysos-lib-netapp-metrocluster-connection.service';

describe('SysosLibNetappMetroclusterConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappMetroclusterConnectionService = TestBed.get(SysosLibNetappMetroclusterConnectionService);
    expect(service).toBeTruthy();
  });
});
