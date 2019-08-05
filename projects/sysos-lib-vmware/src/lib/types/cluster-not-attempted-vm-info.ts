import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterNotAttemptedVmInfo extends DynamicData {
  fault: LocalizedMethodFault;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
