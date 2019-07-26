import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareAlarmManagerService } from './sysos-lib-vmware-alarm-manager.service';

describe('SysosLibVmwareAlarmManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareAlarmManagerService = TestBed.get(SysosLibVmwareAlarmManagerService);
    expect(service).toBeTruthy();
  });
});
