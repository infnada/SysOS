import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareAlarmService } from './sysos-lib-vmware-alarm.service';

describe('SysosLibVmwareAlarmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareAlarmService = TestBed.get(SysosLibVmwareAlarmService);
    expect(service).toBeTruthy();
  });
});
