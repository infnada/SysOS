import { TestBed } from '@angular/core/testing';

import { SysosLibExtGaugejsService } from './sysos-lib-ext-gaugejs.service';

describe('SysosLibExtGaugejsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtGaugejsService = TestBed.get(SysosLibExtGaugejsService);
    expect(service).toBeTruthy();
  });
});
