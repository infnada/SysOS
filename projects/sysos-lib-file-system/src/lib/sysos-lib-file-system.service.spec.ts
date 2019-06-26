import { TestBed } from '@angular/core/testing';

import { SysosLibFileSystemService } from './sysos-lib-file-system.service';

describe('SysosLibFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibFileSystemService = TestBed.get(SysosLibFileSystemService);
    expect(service).toBeTruthy();
  });
});
