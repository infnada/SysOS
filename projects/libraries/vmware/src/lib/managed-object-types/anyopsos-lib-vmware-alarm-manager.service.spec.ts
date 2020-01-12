import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareAlarmManagerService } from './anyopsos-lib-vmware-alarm-manager.service';

describe('AnyOpsOSLibVmwareAlarmManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareAlarmManagerService = TestBed.get(AnyOpsOSLibVmwareAlarmManagerService);
    expect(service).toBeTruthy();
  });
});
