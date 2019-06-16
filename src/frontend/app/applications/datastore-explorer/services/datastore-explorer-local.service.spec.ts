import { TestBed } from '@angular/core/testing';

import { DatastoreExplorerLocalService } from './datastore-explorer-local.service';

describe('DatastoreExplorerLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatastoreExplorerLocalService = TestBed.get(DatastoreExplorerLocalService);
    expect(service).toBeTruthy();
  });
});
