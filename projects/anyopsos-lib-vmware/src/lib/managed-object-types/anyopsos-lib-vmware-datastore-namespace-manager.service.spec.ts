import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDatastoreNamespaceManagerService } from './anyopsos-lib-vmware-datastore-namespace-manager.service';

describe('AnyOpsOSLibVmwareDatastoreNamespaceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDatastoreNamespaceManagerService = TestBed.get(AnyOpsOSLibVmwareDatastoreNamespaceManagerService);
    expect(service).toBeTruthy();
  });
});
