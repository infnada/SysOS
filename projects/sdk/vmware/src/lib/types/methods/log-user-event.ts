import {ManagedObjectReference} from '../data/managed-object-reference';


export interface LogUserEvent {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  msg: string;
}