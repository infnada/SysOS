import { TestBed } from '@angular/core/testing';

import { SysosLibUtilsService } from './sysos-lib-utils.service';

describe('SysosLibUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibUtilsService = TestBed.get(SysosLibUtilsService);
    expect(service).toBeTruthy();
  });
});
