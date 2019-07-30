import { TestBed } from '@angular/core/testing';

import { SysosLibNetappPortsetService } from './sysos-lib-netapp-portset.service';

describe('SysosLibNetappPortsetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappPortsetService = TestBed.get(SysosLibNetappPortsetService);
    expect(service).toBeTruthy();
  });
});
