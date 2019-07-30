import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSisService } from './sysos-lib-netapp-sis.service';

describe('SysosLibNetappSisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSisService = TestBed.get(SysosLibNetappSisService);
    expect(service).toBeTruthy();
  });
});
