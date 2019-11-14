import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareFolderService } from './anyopsos-lib-vmware-folder.service';

describe('AnyOpsOSLibVmwareFolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareFolderService = TestBed.get(AnyOpsOSLibVmwareFolderService);
    expect(service).toBeTruthy();
  });
});
