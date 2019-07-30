import { TestBed } from '@angular/core/testing';

import { SysosLibNetappAutosupportService } from './sysos-lib-netapp-autosupport.service';

describe('SysosLibNetappAutosupportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappAutosupportService = TestBed.get(SysosLibNetappAutosupportService);
    expect(service).toBeTruthy();
  });
});
