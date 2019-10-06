import { TestBed } from '@angular/core/testing';

import { SysosLibExtNetdataService } from './sysos-lib-ext-netdata.service';

describe('SysosLibExtNetdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibExtNetdataService = TestBed.get(SysosLibExtNetdataService);
    expect(service).toBeTruthy();
  });
});
