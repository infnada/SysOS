import {ManagedObjectReference} from '../data/managed-object-reference';


export interface GetAlarmState {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
}