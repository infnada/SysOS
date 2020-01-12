import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareAlarmManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
