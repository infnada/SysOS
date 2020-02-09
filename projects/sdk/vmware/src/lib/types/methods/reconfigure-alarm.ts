import {ManagedObjectReference} from '../data/managed-object-reference';
import {AlarmSpec} from '../data/alarm-spec';


export interface ReconfigureAlarm {
  _this: ManagedObjectReference;
  spec: AlarmSpec;
}