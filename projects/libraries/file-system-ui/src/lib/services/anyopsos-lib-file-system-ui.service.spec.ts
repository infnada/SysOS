import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibFileSystemUiService } from './anyopsos-lib-file-system-ui.service';

describe('AnyOpsOSLibFileSystemUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibFileSystemUiService = TestBed.get(AnyOpsOSLibFileSystemUiService);
    expect(service).toBeTruthy();
  });
});
