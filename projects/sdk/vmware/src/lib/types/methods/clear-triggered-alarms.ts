import {ManagedObjectReference} from '../data/managed-object-reference';
import {AlarmFilterSpec} from '../data/alarm-filter-spec';


export interface ClearTriggeredAlarms {
  _this: ManagedObjectReference;
  filter: AlarmFilterSpec;
}