import { TestBed } from '@angular/core/testing';

import { SysosLibNetappDiskService } from './sysos-lib-netapp-disk.service';

describe('SysosLibNetappDiskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappDiskService = TestBed.get(SysosLibNetappDiskService);
    expect(service).toBeTruthy();
  });
});
