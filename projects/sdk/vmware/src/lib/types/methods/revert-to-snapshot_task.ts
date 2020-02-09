import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RevertToSnapshot_Task {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  suppressPowerOn?: boolean;
}