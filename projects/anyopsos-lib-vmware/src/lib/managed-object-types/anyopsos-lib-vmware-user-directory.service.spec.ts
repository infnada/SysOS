import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareUserDirectoryService } from './anyopsos-lib-vmware-user-directory.service';

describe('AnyOpsOSLibVmwareUserDirectoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareUserDirectoryService = TestBed.get(AnyOpsOSLibVmwareUserDirectoryService);
    expect(service).toBeTruthy();
  });
});
