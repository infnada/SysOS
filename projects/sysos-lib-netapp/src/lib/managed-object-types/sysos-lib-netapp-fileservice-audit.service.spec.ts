import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFileserviceAuditService } from './sysos-lib-netapp-fileservice-audit.service';

describe('SysosLibNetappFileserviceAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFileserviceAuditService = TestBed.get(SysosLibNetappFileserviceAuditService);
    expect(service).toBeTruthy();
  });
});
