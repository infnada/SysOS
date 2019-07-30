import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSnapshotService } from './sysos-lib-netapp-snapshot.service';

describe('SysosLibNetappSnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSnapshotService = TestBed.get(SysosLibNetappSnapshotService);
    expect(service).toBeTruthy();
  });
});
