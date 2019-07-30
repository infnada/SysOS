import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSecurityService } from './sysos-lib-netapp-security.service';

describe('SysosLibNetappSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSecurityService = TestBed.get(SysosLibNetappSecurityService);
    expect(service).toBeTruthy();
  });
});
