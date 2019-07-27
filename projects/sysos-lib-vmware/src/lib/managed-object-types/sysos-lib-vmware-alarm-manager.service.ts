import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareAlarmManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AcknowledgeAlarm() {

  }

  AreAlarmActionsEnabled() {

  }

  ClearTriggeredAlarms() {

  }

  CreateAlarm() {

  }

  EnableAlarmActions() {

  }

  GetAlarm() {

  }

  GetAlarmState() {

  }
}
