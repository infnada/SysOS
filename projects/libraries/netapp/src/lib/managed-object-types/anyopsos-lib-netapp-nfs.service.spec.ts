import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNfsService } from './anyopsos-lib-netapp-nfs.service';

describe('AnyOpsOSLibNetappNfsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNfsService = TestBed.get(AnyOpsOSLibNetappNfsService);
    expect(service).toBeTruthy();
  });
});
