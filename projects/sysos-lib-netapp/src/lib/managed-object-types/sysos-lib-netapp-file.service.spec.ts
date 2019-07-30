import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFileService } from './sysos-lib-netapp-file.service';

describe('SysosLibNetappFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFileService = TestBed.get(SysosLibNetappFileService);
    expect(service).toBeTruthy();
  });
});
