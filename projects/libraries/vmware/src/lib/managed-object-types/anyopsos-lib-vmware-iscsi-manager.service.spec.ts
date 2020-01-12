import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareIscsiManagerService } from './anyopsos-lib-vmware-iscsi-manager.service';

describe('AnyOpsOSLibVmwareIscsiManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareIscsiManagerService = TestBed.get(AnyOpsOSLibVmwareIscsiManagerService);
    expect(service).toBeTruthy();
  });
});
