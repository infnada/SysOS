import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryConfigOption {
  _this: ManagedObjectReference;
  key?: string;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}