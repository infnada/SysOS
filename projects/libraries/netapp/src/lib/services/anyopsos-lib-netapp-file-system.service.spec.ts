import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFileSystemService } from './anyopsos-lib-netapp-file-system.service';

describe('AnyOpsOSLibNetappFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFileSystemService = TestBed.get(AnyOpsOSLibNetappFileSystemService);
    expect(service).toBeTruthy();
  });
});
