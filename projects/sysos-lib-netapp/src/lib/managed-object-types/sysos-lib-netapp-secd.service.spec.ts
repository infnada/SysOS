import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSecdService } from './sysos-lib-netapp-secd.service';

describe('SysosLibNetappSecdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSecdService = TestBed.get(SysosLibNetappSecdService);
    expect(service).toBeTruthy();
  });
});
