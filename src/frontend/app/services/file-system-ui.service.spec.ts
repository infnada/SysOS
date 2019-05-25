import { TestBed } from '@angular/core/testing';

import { FileSystemUiService } from './file-system-ui.service';

describe('FileSystemUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileSystemUiService = TestBed.get(FileSystemUiService);
    expect(service).toBeTruthy();
  });
});
