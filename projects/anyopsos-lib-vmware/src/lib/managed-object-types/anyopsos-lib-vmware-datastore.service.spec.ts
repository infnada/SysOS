import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDatastoreService } from './anyopsos-lib-vmware-datastore.service';

describe('AnyOpsOSLibVmwareDatastoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDatastoreService = TestBed.get(AnyOpsOSLibVmwareDatastoreService);
    expect(service).toBeTruthy();
  });
});
