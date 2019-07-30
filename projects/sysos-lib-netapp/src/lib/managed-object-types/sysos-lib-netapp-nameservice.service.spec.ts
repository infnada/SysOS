import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNameserviceService } from './sysos-lib-netapp-nameservice.service';

describe('SysosLibNetappNameserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNameserviceService = TestBed.get(SysosLibNetappNameserviceService);
    expect(service).toBeTruthy();
  });
});
