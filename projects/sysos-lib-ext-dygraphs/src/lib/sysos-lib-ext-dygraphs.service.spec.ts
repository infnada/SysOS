import { TestBed } from '@angular/core/testing';

import { SysosLibExtDygraphsService } from './sysos-lib-ext-dygraphs.service';

describe('SysosLibExtDygraphsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtDygraphsService = TestBed.get(SysosLibExtDygraphsService);
    expect(service).toBeTruthy();
  });
});
