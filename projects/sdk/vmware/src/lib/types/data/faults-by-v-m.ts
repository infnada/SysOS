import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface FaultsByVM extends DynamicData {
  faults?: LocalizedMethodFault[];
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}