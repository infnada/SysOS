import { TestBed } from '@angular/core/testing';

import { SysosLibExtLzStringService } from './sysos-lib-ext-lz-string.service';

describe('SysosLibExtLzStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtLzStringService = TestBed.get(SysosLibExtLzStringService);
    expect(service).toBeTruthy();
  });
});
