import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareDiagnosticManagerService } from './anyopsos-lib-vmware-diagnostic-manager.service';

describe('AnyOpsOSLibVmwareDiagnosticManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareDiagnosticManagerService = TestBed.get(AnyOpsOSLibVmwareDiagnosticManagerService);
    expect(service).toBeTruthy();
  });
});
