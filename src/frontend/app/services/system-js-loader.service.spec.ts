import { TestBed } from '@angular/core/testing';

import { SystemJsLoaderService } from './system-js-loader.service';

describe('SystemJsLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemJsLoaderService = TestBed.get(SystemJsLoaderService);
    expect(service).toBeTruthy();
  });
});
