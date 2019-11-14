import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSecuritySessionService } from './anyopsos-lib-netapp-security-session.service';

describe('AnyOpsOSLibNetappSecuritySessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSecuritySessionService = TestBed.get(AnyOpsOSLibNetappSecuritySessionService);
    expect(service).toBeTruthy();
  });
});
