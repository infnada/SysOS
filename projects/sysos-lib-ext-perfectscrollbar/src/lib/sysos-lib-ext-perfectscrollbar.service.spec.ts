import { TestBed } from '@angular/core/testing';

import { SysosLibExtPerfectscrollbarService } from './sysos-lib-ext-perfectscrollbar.service';

describe('SysosLibExtPerfectscrollbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtPerfectscrollbarService = TestBed.get(SysosLibExtPerfectscrollbarService);
    expect(service).toBeTruthy();
  });
});
