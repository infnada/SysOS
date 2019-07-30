import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFlashService } from './sysos-lib-netapp-flash.service';

describe('SysosLibNetappFlashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFlashService = TestBed.get(SysosLibNetappFlashService);
    expect(service).toBeTruthy();
  });
});
