import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RegisterChildVM_Task {
  _this: ManagedObjectReference;
  path: string;
  name?: string;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}