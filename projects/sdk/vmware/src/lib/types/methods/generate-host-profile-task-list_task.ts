import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConfigSpec} from '../data/host-config-spec';


export interface GenerateHostProfileTaskList_Task {
  _this: ManagedObjectReference;
  configSpec: HostConfigSpec;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}