import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryDescriptions {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}