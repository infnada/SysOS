import { TestBed } from '@angular/core/testing';

import { SysosLibFileSystemUiService } from './sysos-lib-file-system-ui.service';

describe('SysosLibFileSystemUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibFileSystemUiService = TestBed.get(SysosLibFileSystemUiService);
    expect(service).toBeTruthy();
  });
});
