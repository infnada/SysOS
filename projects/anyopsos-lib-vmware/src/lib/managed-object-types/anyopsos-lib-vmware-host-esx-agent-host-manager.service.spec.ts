import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostEsxAgentHostManagerService } from './anyopsos-lib-vmware-host-esx-agent-host-manager.service';

describe('AnyOpsOSLibVmwareHostEsxAgentHostManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostEsxAgentHostManagerService = TestBed.get(AnyOpsOSLibVmwareHostEsxAgentHostManagerService);
    expect(service).toBeTruthy();
  });
});
