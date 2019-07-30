import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFcService } from './sysos-lib-netapp-fc.service';

describe('SysosLibNetappFcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFcService = TestBed.get(SysosLibNetappFcService);
    expect(service).toBeTruthy();
  });
});
