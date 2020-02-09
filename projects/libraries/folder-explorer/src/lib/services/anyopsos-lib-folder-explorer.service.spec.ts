import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibFolderExplorerService } from './anyopsos-lib-folder-explorer.service';

describe('AnyOpsOSLibFolderExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibFolderExplorerService = TestBed.get(AnyOpsOSLibFolderExplorerService);
    expect(service).toBeTruthy();
  });
});
