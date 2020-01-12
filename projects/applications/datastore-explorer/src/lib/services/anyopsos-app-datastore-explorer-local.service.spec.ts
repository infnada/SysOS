import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppDatastoreExplorerLocalService } from './anyopsos-app-datastore-explorer-local.service';

describe('AnyOpsOSAppDatastoreExplorerLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppDatastoreExplorerLocalService = TestBed.get(AnyOpsOSAppDatastoreExplorerLocalService);
    expect(service).toBeTruthy();
  });
});
