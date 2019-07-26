import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDiagnosticManagerService } from './sysos-lib-vmware-diagnostic-manager.service';

describe('SysosLibVmwareDiagnosticManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDiagnosticManagerService = TestBed.get(SysosLibVmwareDiagnosticManagerService);
    expect(service).toBeTruthy();
  });
});
