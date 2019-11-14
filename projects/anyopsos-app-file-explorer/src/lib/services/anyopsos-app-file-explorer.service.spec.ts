import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppFileExplorerService } from './anyopsos-app-file-explorer.service';

describe('AnyOpsOSAppFileExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppFileExplorerService = TestBed.get(AnyOpsOSAppFileExplorerService);
    expect(service).toBeTruthy();
  });
});
