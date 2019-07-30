import { TestBed } from '@angular/core/testing';

import { SysosLibNetappPerfService } from './sysos-lib-netapp-perf.service';

describe('SysosLibNetappPerfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappPerfService = TestBed.get(SysosLibNetappPerfService);
    expect(service).toBeTruthy();
  });
});
