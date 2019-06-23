import { TestBed } from '@angular/core/testing';

import { SysosAppDatastoreExplorerLocalService } from './sysos-app-datastore-explorer-local.service';

describe('SysosAppDatastoreExplorerLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppDatastoreExplorerLocalService = TestBed.get(SysosAppDatastoreExplorerLocalService);
    expect(service).toBeTruthy();
  });
});
