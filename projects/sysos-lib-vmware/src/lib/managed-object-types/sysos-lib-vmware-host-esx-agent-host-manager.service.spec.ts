import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostEsxAgentHostManagerService } from './sysos-lib-vmware-host-esx-agent-host-manager.service';

describe('SysosLibVmwareHostEsxAgentHostManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostEsxAgentHostManagerService = TestBed.get(SysosLibVmwareHostEsxAgentHostManagerService);
    expect(service).toBeTruthy();
  });
});
