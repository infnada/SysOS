import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSecuritySessionService } from './sysos-lib-netapp-security-session.service';

describe('SysosLibNetappSecuritySessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSecuritySessionService = TestBed.get(SysosLibNetappSecuritySessionService);
    expect(service).toBeTruthy();
  });
});
