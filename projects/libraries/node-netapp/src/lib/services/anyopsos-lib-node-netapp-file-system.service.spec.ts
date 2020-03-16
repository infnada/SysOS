import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeNetappFileSystemService } from './anyopsos-lib-node-netapp-file-system.service';

describe('AnyOpsOSLibNodeNetappFileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeNetappFileSystemService = TestBed.get(AnyOpsOSLibNodeNetappFileSystemService);
    expect(service).toBeTruthy();
  });
});
