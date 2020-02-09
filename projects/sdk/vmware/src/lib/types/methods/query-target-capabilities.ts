import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryTargetCapabilities {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}