import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFileService } from './anyopsos-lib-netapp-file.service';

describe('AnyOpsOSLibNetappFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFileService = TestBed.get(AnyOpsOSLibNetappFileService);
    expect(service).toBeTruthy();
  });
});
