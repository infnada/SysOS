import { TestBed } from '@angular/core/testing';

import { SysosAppDatastoreExplorerService } from './sysos-app-datastore-explorer.service';

describe('SysosAppDatastoreExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppDatastoreExplorerService = TestBed.get(SysosAppDatastoreExplorerService);
    expect(service).toBeTruthy();
  });
});
