import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostDiagnosticSystemService } from './sysos-lib-vmware-host-diagnostic-system.service';

describe('SysosLibVmwareHostDiagnosticSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostDiagnosticSystemService = TestBed.get(SysosLibVmwareHostDiagnosticSystemService);
    expect(service).toBeTruthy();
  });
});
