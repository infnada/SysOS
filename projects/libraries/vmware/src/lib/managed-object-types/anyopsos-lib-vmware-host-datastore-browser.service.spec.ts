import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostDatastoreBrowserService } from './anyopsos-lib-vmware-host-datastore-browser.service';

describe('AnyOpsOSLibVmwareHostDatastoreBrowserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostDatastoreBrowserService = TestBed.get(AnyOpsOSLibVmwareHostDatastoreBrowserService);
    expect(service).toBeTruthy();
  });
});
