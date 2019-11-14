import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareAlarmService } from './anyopsos-lib-vmware-alarm.service';

describe('AnyOpsOSLibVmwareAlarmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareAlarmService = TestBed.get(AnyOpsOSLibVmwareAlarmService);
    expect(service).toBeTruthy();
  });
});
