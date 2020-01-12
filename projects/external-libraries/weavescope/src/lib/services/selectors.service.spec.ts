import { TestBed } from '@angular/core/testing';

import { SelectorsService } from './selectors.service';

describe('SelectorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectorsService = TestBed.get(SelectorsService);
    expect(service).toBeTruthy();
  });
});
