import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSnaplockService } from './sysos-lib-netapp-snaplock.service';

describe('SysosLibNetappSnaplockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSnaplockService = TestBed.get(SysosLibNetappSnaplockService);
    expect(service).toBeTruthy();
  });
});
