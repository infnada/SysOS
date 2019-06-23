import { TestBed } from '@angular/core/testing';

import { SysosAppDatastoreExplorerServerService } from './sysos-app-datastore-explorer-server.service';

describe('SysosAppDatastoreExplorerServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppDatastoreExplorerServerService = TestBed.get(SysosAppDatastoreExplorerServerService);
    expect(service).toBeTruthy();
  });
});
