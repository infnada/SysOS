import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppDatastoreExplorerServerService } from './anyopsos-app-datastore-explorer-server.service';

describe('AnyOpsOSAppDatastoreExplorerServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppDatastoreExplorerServerService = TestBed.get(AnyOpsOSAppDatastoreExplorerServerService);
    expect(service).toBeTruthy();
  });
});
