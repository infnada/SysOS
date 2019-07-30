import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVscanService } from './sysos-lib-netapp-vscan.service';

describe('SysosLibNetappVscanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVscanService = TestBed.get(SysosLibNetappVscanService);
    expect(service).toBeTruthy();
  });
});
