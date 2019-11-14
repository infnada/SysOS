import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostDatastoreSystemService } from './anyopsos-lib-vmware-host-datastore-system.service';

describe('AnyOpsOSLibVmwareHostDatastoreSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostDatastoreSystemService = TestBed.get(AnyOpsOSLibVmwareHostDatastoreSystemService);
    expect(service).toBeTruthy();
  });
});
