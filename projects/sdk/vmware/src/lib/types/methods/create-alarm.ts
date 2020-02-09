import {ManagedObjectReference} from '../data/managed-object-reference';
import {AlarmSpec} from '../data/alarm-spec';


export interface CreateAlarm {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  spec: AlarmSpec;
}