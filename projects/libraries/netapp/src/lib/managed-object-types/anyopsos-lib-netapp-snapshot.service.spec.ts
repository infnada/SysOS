import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSnapshotService } from './anyopsos-lib-netapp-snapshot.service';

describe('AnyOpsOSLibNetappSnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSnapshotService = TestBed.get(AnyOpsOSLibNetappSnapshotService);
    expect(service).toBeTruthy();
  });
});
