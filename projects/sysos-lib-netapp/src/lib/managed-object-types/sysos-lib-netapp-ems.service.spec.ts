import { TestBed } from '@angular/core/testing';

import { SysosLibNetappEmsService } from './sysos-lib-netapp-ems.service';

describe('SysosLibNetappEmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappEmsService = TestBed.get(SysosLibNetappEmsService);
    expect(service).toBeTruthy();
  });
});
