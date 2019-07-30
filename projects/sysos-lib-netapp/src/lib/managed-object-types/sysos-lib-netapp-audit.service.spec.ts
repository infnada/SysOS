import { TestBed } from '@angular/core/testing';

import { SysosLibNetappAuditService } from './sysos-lib-netapp-audit.service';

describe('SysosLibNetappAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappAuditService = TestBed.get(SysosLibNetappAuditService);
    expect(service).toBeTruthy();
  });
});
