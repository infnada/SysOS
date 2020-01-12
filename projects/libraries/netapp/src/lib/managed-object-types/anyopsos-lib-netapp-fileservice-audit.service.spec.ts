import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFileserviceAuditService } from './anyopsos-lib-netapp-fileservice-audit.service';

describe('AnyOpsOSLibNetappFileserviceAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFileserviceAuditService = TestBed.get(AnyOpsOSLibNetappFileserviceAuditService);
    expect(service).toBeTruthy();
  });
});
