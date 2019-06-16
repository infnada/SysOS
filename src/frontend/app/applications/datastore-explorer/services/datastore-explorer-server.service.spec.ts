import { TestBed } from '@angular/core/testing';

import { DatastoreExplorerServerService } from './datastore-explorer-server.service';

describe('DatastoreExplorerServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatastoreExplorerServerService = TestBed.get(DatastoreExplorerServerService);
    expect(service).toBeTruthy();
  });
});
