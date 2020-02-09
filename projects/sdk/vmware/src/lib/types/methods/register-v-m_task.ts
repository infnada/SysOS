import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RegisterVM_Task {
  _this: ManagedObjectReference;
  path: string;
  name?: string;
  asTemplate: boolean;
  pool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}