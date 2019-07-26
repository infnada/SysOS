import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostDatastoreBrowserService } from './sysos-lib-vmware-host-datastore-browser.service';

describe('SysosLibVmwareHostDatastoreBrowserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostDatastoreBrowserService = TestBed.get(SysosLibVmwareHostDatastoreBrowserService);
    expect(service).toBeTruthy();
  });
});
