import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappAuditService } from './anyopsos-lib-netapp-audit.service';

describe('AnyOpsOSLibNetappAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappAuditService = TestBed.get(AnyOpsOSLibNetappAuditService);
    expect(service).toBeTruthy();
  });
});
