import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostDiagnosticSystemService } from './anyopsos-lib-vmware-host-diagnostic-system.service';

describe('AnyOpsOSLibVmwareHostDiagnosticSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostDiagnosticSystemService = TestBed.get(AnyOpsOSLibVmwareHostDiagnosticSystemService);
    expect(service).toBeTruthy();
  });
});
