import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappActiveDirectoryService } from './anyopsos-lib-netapp-active-directory.service';

describe('AnyOpsOSLibNetappActiveDirectoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappActiveDirectoryService = TestBed.get(AnyOpsOSLibNetappActiveDirectoryService);
    expect(service).toBeTruthy();
  });
});
