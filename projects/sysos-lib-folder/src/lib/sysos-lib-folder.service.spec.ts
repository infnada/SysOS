import { TestBed } from '@angular/core/testing';

import { SysosLibFolderService } from './sysos-lib-folder.service';

describe('SysosLibFolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibFolderService = TestBed.get(SysosLibFolderService);
    expect(service).toBeTruthy();
  });
});
