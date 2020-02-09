import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryIORMConfigOption {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}