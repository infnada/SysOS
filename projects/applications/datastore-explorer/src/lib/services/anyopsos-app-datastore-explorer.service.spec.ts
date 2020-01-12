import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppDatastoreExplorerService } from './anyopsos-app-datastore-explorer.service';

describe('AnyOpsOSAppDatastoreExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppDatastoreExplorerService = TestBed.get(AnyOpsOSAppDatastoreExplorerService);
    expect(service).toBeTruthy();
  });
});
