import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSnapdiffService } from './sysos-lib-netapp-snapdiff.service';

describe('SysosLibNetappSnapdiffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSnapdiffService = TestBed.get(SysosLibNetappSnapdiffService);
    expect(service).toBeTruthy();
  });
});
