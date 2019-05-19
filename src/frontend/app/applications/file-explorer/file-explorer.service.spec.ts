import { TestBed } from '@angular/core/testing';

import { FileExplorerService } from './file-explorer.service';

describe('FileExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileExplorerService = TestBed.get(FileExplorerService);
    expect(service).toBeTruthy();
  });
});
