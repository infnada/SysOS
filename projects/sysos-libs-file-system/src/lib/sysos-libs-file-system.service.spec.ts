import { TestBed } from '@angular/core/testing';

import { SysosLibsFileSystemService } from './sysos-libs-file-system.service';

describe('SysosLibsFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsFileSystemService = TestBed.get(SysosLibsFileSystemService);
    expect(service).toBeTruthy();
  });
});
