import { TestBed } from '@angular/core/testing';

import { SysosLibNetappLunService } from './sysos-lib-netapp-lun.service';

describe('SysosLibNetappLunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappLunService = TestBed.get(SysosLibNetappLunService);
    expect(service).toBeTruthy();
  });
});
