import { TestBed } from '@angular/core/testing';

import { SysosLibExtJqueryService } from './sysos-lib-ext-jquery.service';

describe('SysosLibExtJqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtJqueryService = TestBed.get(SysosLibExtJqueryService);
    expect(service).toBeTruthy();
  });
});
