import { TestBed } from '@angular/core/testing';

import { SysosLibExtPakoService } from './sysos-lib-ext-pako.service';

describe('SysosLibExtPakoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtPakoService = TestBed.get(SysosLibExtPakoService);
    expect(service).toBeTruthy();
  });
});
