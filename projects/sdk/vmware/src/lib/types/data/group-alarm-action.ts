import {AlarmAction} from './alarm-action';


export interface GroupAlarmAction extends AlarmAction {
  action: AlarmAction[];
}