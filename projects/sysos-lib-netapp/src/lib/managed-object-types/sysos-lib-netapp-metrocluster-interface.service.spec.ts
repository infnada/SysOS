import { TestBed } from '@angular/core/testing';

import { SysosLibNetappMetroclusterInterfaceService } from './sysos-lib-netapp-metrocluster-interface.service';

describe('SysosLibNetappMetroclusterInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappMetroclusterInterfaceService = TestBed.get(SysosLibNetappMetroclusterInterfaceService);
    expect(service).toBeTruthy();
  });
});
