import { TestBed } from '@angular/core/testing';

import { SysosLibNetappActiveDirectoryService } from './sysos-lib-netapp-active-directory.service';

describe('SysosLibNetappActiveDirectoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappActiveDirectoryService = TestBed.get(SysosLibNetappActiveDirectoryService);
    expect(service).toBeTruthy();
  });
});
