import { TestBed } from '@angular/core/testing';

import { SysosAppFileExplorerService } from './sysos-app-file-explorer.service';

describe('SysosAppFileExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppFileExplorerService = TestBed.get(SysosAppFileExplorerService);
    expect(service).toBeTruthy();
  });
});
