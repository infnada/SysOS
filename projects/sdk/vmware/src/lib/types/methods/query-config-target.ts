import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryConfigTarget {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}