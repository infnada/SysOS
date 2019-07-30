import { TestBed } from '@angular/core/testing';

import { SysosLibNetappExportsService } from './sysos-lib-netapp-exports.service';

describe('SysosLibNetappExportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappExportsService = TestBed.get(SysosLibNetappExportsService);
    expect(service).toBeTruthy();
  });
});
