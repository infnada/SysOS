import { TestBed } from '@angular/core/testing';

import { DatastoreExplorerService } from './datastore-explorer.service';

describe('DatastoreExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatastoreExplorerService = TestBed.get(DatastoreExplorerService);
    expect(service).toBeTruthy();
  });
});
