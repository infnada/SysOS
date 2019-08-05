import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostVmciAccessManagerAccessSpec extends DynamicData {
  mode?: string[];
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
