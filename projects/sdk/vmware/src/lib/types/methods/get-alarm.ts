import {ManagedObjectReference} from '../data/managed-object-reference';


export interface GetAlarm {
  _this: ManagedObjectReference;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
}