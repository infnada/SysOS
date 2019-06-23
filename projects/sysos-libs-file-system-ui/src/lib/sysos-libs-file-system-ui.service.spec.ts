import { TestBed } from '@angular/core/testing';

import { SysosLibsFileSystemUiService } from './sysos-libs-file-system-ui.service';

describe('SysosLibsFileSystemUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibsFileSystemUiService = TestBed.get(SysosLibsFileSystemUiService);
    expect(service).toBeTruthy();
  });
});
