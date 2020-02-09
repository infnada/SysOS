import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QuerySupportedFeatures {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}